import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Integration, MOCK_INTEGRATIONS, MOCK_AI_CAPABILITIES, MOCK_DATA_FIELDS,
  MOCK_SYNC_LOGS, DISCOVERY_CAPABILITIES, SyncLog, AiCapability, DataField
} from '../integration.models';

@Component({
  selector: 'app-integration-detail',
  imports: [RouterLink, MatTabsModule, MatMenuModule, DecimalPipe],
  templateUrl: './integration-detail.html',
  styleUrl: './integration-detail.scss'
})
export class IntegrationDetail implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  integration = signal<Integration | null>(null);
  syncProgress = signal(0);
  syncStep = signal(0);
  activeTab = signal(0);
  showDisconnectConfirm = signal(false);

  // Inline connect modal state
  showConnectModal = signal(false);
  connectStep = signal(1);
  oauthLoading = signal(false);
  dataFields = signal([...MOCK_DATA_FIELDS.map(f => ({ ...f }))]);

  readonly connectPermissions = [
    'Read and manage your Pages',
    'Access post performance and engagement data',
    'View ad account insights and spend',
    'Read and send inbox messages',
  ];

  readonly syncSteps = [
    { label: 'Account authenticated', icon: 'verified_user' },
    { label: 'Permissions granted', icon: 'lock_open' },
    { label: 'Importing records', icon: 'sync' },
    { label: 'Mapping to AI knowledge', icon: 'psychology' },
  ];

  readonly aiCapabilities = signal<AiCapability[]>(MOCK_AI_CAPABILITIES);
  readonly syncLogs = signal<SyncLog[]>(MOCK_SYNC_LOGS);
  readonly discoveryCapabilities = signal<AiCapability[]>(DISCOVERY_CAPABILITIES);

  readonly lastSyncLabel = computed(() => {
    const d = this.integration()?.lastSynced;
    if (!d) return 'Never';
    const mins = Math.floor((Date.now() - d.getTime()) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    return `${Math.floor(mins / 60)}h ago`;
  });

  private syncInterval: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = MOCK_INTEGRATIONS.find(i => i.id === id);
    if (found) {
      this.integration.set({ ...found });
    } else {
      this.router.navigate(['/integrations']);
    }
  }

  ngOnDestroy() {
    if (this.syncInterval) clearInterval(this.syncInterval);
  }

  openConnectModal() {
    this.connectStep.set(1);
    this.oauthLoading.set(false);
    this.showConnectModal.set(true);
  }

  connectNextStep() {
    if (this.connectStep() === 1) {
      this.connectStep.set(2);
      this.oauthLoading.set(true);
      setTimeout(() => this.oauthLoading.set(false), 1800);
    } else if (this.connectStep() === 2) {
      this.connectStep.set(3);
    } else {
      this.showConnectModal.set(false);
      this.startSyncing();
    }
  }

  closeConnectModal() { this.showConnectModal.set(false); }

  toggleDataField(index: number) {
    this.dataFields.update(fields =>
      fields.map((f, i) => i === index ? { ...f, enabled: !f.enabled } : f)
    );
  }

  startSyncing() {
    this.integration.update(i => i ? { ...i, status: 'syncing' } : i);
    this.syncProgress.set(0);
    this.syncStep.set(0);

    this.syncInterval = setInterval(() => {
      this.syncProgress.update(p => {
        const next = Math.min(p + 1.5, 100);
        if (next >= 20 && this.syncStep() < 1) this.syncStep.set(1);
        if (next >= 50 && this.syncStep() < 2) this.syncStep.set(2);
        if (next >= 80 && this.syncStep() < 3) this.syncStep.set(3);
        return next;
      });

      if (this.syncProgress() >= 100) {
        clearInterval(this.syncInterval!);
        this.syncInterval = null;
        setTimeout(() => {
          this.integration.update(i => i ? {
            ...i,
            status: 'connected',
            lastSynced: new Date(),
            recordCount: 12847,
            dailySyncs: 186420,
            aiQueries: 24892,
            knowledgeScore: 82,
            connectedBy: 'Siva Prakash',
            connectedOn: 'Today'
          } : i);
          this.snackBar.open(`${this.integration()?.name} connected successfully`, 'Dismiss', { duration: 4000 });
        }, 600);
      }
    }, 50);
  }

  syncNow() {
    this.snackBar.open('Sync started...', '', { duration: 2000 });
    setTimeout(() => {
      this.integration.update(i => i ? { ...i, lastSynced: new Date() } : i);
      this.snackBar.open('Sync completed successfully', 'Dismiss', { duration: 3000 });
    }, 2000);
  }

  reconnect() {
    this.integration.update(i => i ? { ...i, status: 'not-connected', errorMessage: undefined } : i);
    setTimeout(() => this.openConnectModal(), 50);
  }

  confirmDisconnect() { this.showDisconnectConfirm.set(true); }
  cancelDisconnect() { this.showDisconnectConfirm.set(false); }

  disconnect() {
    this.showDisconnectConfirm.set(false);
    this.integration.update(i => i ? {
      ...i, status: 'not-connected',
      lastSynced: undefined, recordCount: undefined,
      dailySyncs: undefined, aiQueries: undefined, knowledgeScore: undefined
    } : i);
    this.snackBar.open(`${this.integration()?.name} disconnected`, 'Dismiss', { duration: 4000 });
    setTimeout(() => this.router.navigate(['/integrations']), 1500);
  }

  runInBackground() {
    this.router.navigate(['/integrations']);
  }

  syncLogStatusClass(status: string): string {
    if (status === 'success') return 'log-success';
    if (status === 'error') return 'log-error';
    return 'log-skipped';
  }

  formatTimestamp(d: Date): string {
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
