import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOCK_INTEGRATIONS, Integration, ConnectionStatus } from '../integration.models';

type Filter = 'all' | 'connected' | 'not-connected';

@Component({
  selector: 'app-integrations-list',
  imports: [RouterLink],
  templateUrl: './integrations-list.html',
  styleUrl: './integrations-list.scss'
})
export class IntegrationsList {
  readonly allIntegrations = signal<Integration[]>(MOCK_INTEGRATIONS);
  readonly activeFilter = signal<Filter>('all');
  readonly searchQuery = signal('');

  readonly filtered = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return this.allIntegrations().filter(i => {
      const matchesSearch = !q || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
      const f = this.activeFilter();
      const matchesFilter =
        f === 'all' ||
        (f === 'connected' && (i.status === 'connected' || i.status === 'error')) ||
        (f === 'not-connected' && i.status === 'not-connected');
      return matchesSearch && matchesFilter;
    });
  });

  readonly connectedCount = computed(() =>
    this.allIntegrations().filter(i => i.status === 'connected' || i.status === 'error').length
  );

  setFilter(f: Filter) { this.activeFilter.set(f); }

  statusLabel(status: ConnectionStatus): string {
    if (status === 'connected') return 'Connected';
    if (status === 'error') return 'Error';
    return 'Connect';
  }

  statusClass(status: ConnectionStatus): string {
    if (status === 'connected') return 'chip-connected';
    if (status === 'error') return 'chip-error';
    return 'chip-connect';
  }
}
