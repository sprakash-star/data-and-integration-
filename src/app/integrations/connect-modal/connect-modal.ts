import { Component, signal, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Integration, MOCK_DATA_FIELDS, DataField } from '../integration.models';

@Component({
  selector: 'app-connect-modal',
  imports: [MatProgressSpinnerModule],
  templateUrl: './connect-modal.html',
  styleUrl: './connect-modal.scss'
})
export class ConnectModal {
  private dialogRef = inject(MatDialogRef<ConnectModal>);
  readonly integration: Integration = inject(MAT_DIALOG_DATA);

  step = signal(1);
  oauthLoading = signal(false);
  fields = signal<DataField[]>(MOCK_DATA_FIELDS.map(f => ({ ...f })));

  readonly permissions = [
    `Read and manage your ${this.integration.name} Pages`,
    'Access post performance and engagement data',
    'View ad account insights and spend',
    'Read and send inbox messages',
  ];

  nextStep() {
    if (this.step() === 1) {
      this.step.set(2);
      this.oauthLoading.set(true);
      setTimeout(() => this.oauthLoading.set(false), 1800);
    } else if (this.step() === 2) {
      this.step.set(3);
    } else {
      this.dialogRef.close('connected');
    }
  }

  cancel() { this.dialogRef.close(null); }

  toggleField(index: number) {
    this.fields.update(fields =>
      fields.map((f, i) => i === index ? { ...f, enabled: !f.enabled } : f)
    );
  }
}
