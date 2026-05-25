import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MOCK_INTEGRATIONS, Integration } from '../integration.models';

type Filter = 'all' | 'connected' | 'not-connected';
type SectionTab = 'vendasta' | 'my-apps' | 'integrations';

@Component({
  selector: 'app-integrations-list',
  imports: [RouterLink],
  templateUrl: './integrations-list.html',
  styleUrl: './integrations-list.scss'
})
export class IntegrationsList {
  readonly allIntegrations = signal<Integration[]>(MOCK_INTEGRATIONS);
  readonly activeFilter = signal<Filter>('all');
  readonly activeTab = signal<SectionTab>('integrations');
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
  setTab(t: SectionTab) { this.activeTab.set(t); }

  onImgError(event: Event, name: string) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const parent = img.parentElement!;
    parent.style.background = '#e0e0e0';
    const span = document.createElement('span');
    span.textContent = name.slice(0, 2).toUpperCase();
    span.style.cssText = 'font-size:11px;font-weight:700;color:#616161';
    parent.appendChild(span);
  }
}
