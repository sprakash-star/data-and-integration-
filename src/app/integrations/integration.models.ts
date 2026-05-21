export type ConnectionStatus = 'not-connected' | 'syncing' | 'connected' | 'error';

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'social' | 'crm' | 'payments' | 'productivity' | 'other';
  icon: string;
  iconBg: string;
  status: ConnectionStatus;
  lastSynced?: Date;
  recordCount?: number;
  dailySyncs?: number;
  aiQueries?: number;
  knowledgeScore?: number;
  errorMessage?: string;
  connectedBy?: string;
  connectedOn?: string;
}

export interface SyncLog {
  id: string;
  timestamp: Date;
  recordsProcessed: number;
  duration: number;
  status: 'success' | 'error' | 'skipped';
  errorMessage?: string;
}

export interface AiCapability {
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export interface DataField {
  name: string;
  type: string;
  direction: 'read' | 'write' | 'both';
  usedBy: string;
  enabled: boolean;
}

export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: 'facebook', name: 'Facebook', description: 'Social media management and advertising',
    category: 'social', icon: 'f', iconBg: '#1877F2',
    status: 'connected', lastSynced: new Date(Date.now() - 2 * 60 * 1000),
    recordCount: 12847, dailySyncs: 186420, aiQueries: 24892, knowledgeScore: 82,
    connectedBy: 'Siva Prakash', connectedOn: 'March 14, 2024'
  },
  {
    id: 'instagram', name: 'Instagram', description: 'Photo and video sharing platform',
    category: 'social', icon: 'ig', iconBg: '#E1306C', status: 'not-connected'
  },
  {
    id: 'linkedin', name: 'LinkedIn', description: 'Professional networking and B2B marketing',
    category: 'social', icon: 'in', iconBg: '#0077B5', status: 'not-connected'
  },
  {
    id: 'x', name: 'X', description: 'Real-time social media engagement',
    category: 'social', icon: 'x', iconBg: '#000000', status: 'not-connected'
  },
  {
    id: 'youtube', name: 'YouTube', description: 'Video content and advertising',
    category: 'social', icon: 'yt', iconBg: '#FF0000', status: 'not-connected'
  },
  {
    id: 'hubspot', name: 'HubSpot', description: 'Marketing, sales, and CRM platform',
    category: 'crm', icon: 'hs', iconBg: '#FF7A59',
    status: 'error', errorMessage: 'API token expired on May 20, 2026. Re-authentication required.',
    recordCount: 8241, dailySyncs: 42000, aiQueries: 9300, knowledgeScore: 61,
    connectedBy: 'Siva Prakash', connectedOn: 'January 8, 2024'
  },
  {
    id: 'salesforce', name: 'Salesforce', description: 'Enterprise CRM and sales automation',
    category: 'crm', icon: 'sf', iconBg: '#00A1E0', status: 'not-connected'
  },
  {
    id: 'google', name: 'Google', description: 'Google services and search integration',
    category: 'productivity', icon: 'g', iconBg: '#4285F4',
    status: 'connected', lastSynced: new Date(Date.now() - 10 * 60 * 1000),
    recordCount: 5423, dailySyncs: 31000, aiQueries: 14200, knowledgeScore: 75,
    connectedBy: 'Siva Prakash', connectedOn: 'February 2, 2024'
  },
  {
    id: 'slack', name: 'Slack', description: 'Team notifications and collaboration',
    category: 'productivity', icon: 'sl', iconBg: '#4A154B', status: 'not-connected'
  },
  {
    id: 'stripe', name: 'Stripe', description: 'Payment processing and billing',
    category: 'payments', icon: 'st', iconBg: '#6772E5', status: 'not-connected'
  },
  {
    id: 'shopify', name: 'Shopify', description: 'E-commerce platform integration',
    category: 'payments', icon: 'sh', iconBg: '#96BF48', status: 'not-connected'
  },
  {
    id: 'zapier', name: 'Zapier', description: 'Workflow automation and app connections',
    category: 'other', icon: 'zp', iconBg: '#FF4A00', status: 'not-connected'
  },
];

export const MOCK_AI_CAPABILITIES: AiCapability[] = [
  { name: 'Social AI', description: 'Automated post scheduling and content optimization', icon: 'auto_awesome', enabled: true },
  { name: 'Conversations AI', description: 'Inbox management and smart reply suggestions', icon: 'chat', enabled: true },
  { name: 'Campaigns AI', description: 'Ad performance reporting and budget recommendations', icon: 'campaign', enabled: true },
  { name: 'Reputation AI', description: 'Sentiment analysis from comments and reviews', icon: 'star', enabled: false },
];

export const MOCK_DATA_FIELDS: DataField[] = [
  { name: 'Posts & Engagement', type: 'Social activity', direction: 'read', usedBy: 'Social AI', enabled: true },
  { name: 'Ad Performance', type: 'Advertising data', direction: 'read', usedBy: 'Campaigns AI', enabled: true },
  { name: 'Page Insights', type: 'Analytics', direction: 'read', usedBy: 'Reporting AI', enabled: true },
  { name: 'Inbox Messages', type: 'Conversations', direction: 'both', usedBy: 'Conversations AI', enabled: true },
  { name: 'Audience Demographics', type: 'User data', direction: 'read', usedBy: 'Social AI', enabled: false },
];

export const MOCK_SYNC_LOGS: SyncLog[] = [
  { id: '1', timestamp: new Date(Date.now() - 2 * 60 * 1000), recordsProcessed: 1284, duration: 12, status: 'success' },
  { id: '2', timestamp: new Date(Date.now() - 32 * 60 * 1000), recordsProcessed: 987, duration: 9, status: 'success' },
  { id: '3', timestamp: new Date(Date.now() - 62 * 60 * 1000), recordsProcessed: 0, duration: 3, status: 'error', errorMessage: 'Rate limit exceeded' },
  { id: '4', timestamp: new Date(Date.now() - 92 * 60 * 1000), recordsProcessed: 1102, duration: 11, status: 'success' },
  { id: '5', timestamp: new Date(Date.now() - 122 * 60 * 1000), recordsProcessed: 843, duration: 8, status: 'success' },
  { id: '6', timestamp: new Date(Date.now() - 152 * 60 * 1000), recordsProcessed: 0, duration: 1, status: 'skipped', errorMessage: 'No new data' },
  { id: '7', timestamp: new Date(Date.now() - 182 * 60 * 1000), recordsProcessed: 1456, duration: 14, status: 'success' },
];

export const DISCOVERY_CAPABILITIES: AiCapability[] = [
  { name: 'Social AI', description: 'Schedule and optimize posts automatically using your content data', icon: 'auto_awesome', enabled: false },
  { name: 'Conversations AI', description: 'Manage inbox messages with AI-suggested smart replies', icon: 'chat', enabled: false },
  { name: 'Campaigns AI', description: 'Get ad performance insights and budget optimization tips', icon: 'campaign', enabled: false },
];
