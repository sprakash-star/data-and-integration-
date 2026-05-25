export type ConnectionStatus = 'not-connected' | 'syncing' | 'connected' | 'error';

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'social' | 'crm' | 'payments' | 'productivity' | 'messaging' | 'other';
  logoUrl: string;       // Simple Icons CDN URL
  logoColor?: string;    // hex bg tint for detail page icon container
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

const SI = (slug: string, color = '000000') =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

const IC = (slug: string) =>
  `https://api.iconify.design/${slug}.svg`;

export const MOCK_INTEGRATIONS: Integration[] = [
  // Row 1 — Social
  {
    id: 'facebook', name: 'Facebook', description: 'Social media management and advertising',
    category: 'social', logoUrl: SI('facebook', '1877F2'), logoColor: '#e7f0fd',
    status: 'connected', lastSynced: new Date(Date.now() - 2 * 60000),
    recordCount: 12847, dailySyncs: 186420, aiQueries: 24892, knowledgeScore: 82,
    connectedBy: 'Siva Prakash', connectedOn: 'Today'
  },
  {
    id: 'instagram', name: 'Instagram', description: 'Photo and video sharing platform',
    category: 'social', logoUrl: SI('instagram', 'E4405F'), logoColor: '#fdeef3',
    status: 'not-connected'
  },
  {
    id: 'linkedin', name: 'LinkedIn', description: 'Professional networking and B2B marketing',
    category: 'social', logoUrl: IC('logos:linkedin-icon'), logoColor: '#e5f0fb',
    status: 'connected', lastSynced: new Date(Date.now() - 15 * 60000),
    recordCount: 5234, dailySyncs: 42100, aiQueries: 8901, knowledgeScore: 74,
    connectedBy: 'Siva Prakash', connectedOn: 'Apr 2'
  },
  {
    id: 'x', name: 'X', description: 'Real-time social media engagement',
    category: 'social', logoUrl: SI('x', '000000'), logoColor: '#f0f0f0',
    status: 'not-connected'
  },
  {
    id: 'youtube', name: 'YouTube', description: 'Video content and advertising',
    category: 'social', logoUrl: SI('youtube', 'FF0000'), logoColor: '#ffecec',
    status: 'not-connected'
  },
  {
    id: 'pinterest', name: 'Pinterest', description: 'Visual discovery and shopping',
    category: 'social', logoUrl: SI('pinterest', 'BD081C'), logoColor: '#ffecec',
    status: 'not-connected'
  },

  // Row 2 — Messaging & Tools
  {
    id: 'whatsapp', name: 'WhatsApp', description: 'Business messaging and communication',
    category: 'messaging', logoUrl: SI('whatsapp', '25D366'), logoColor: '#e6f9ee',
    status: 'connected', lastSynced: new Date(Date.now() - 8 * 60000),
    recordCount: 3892, dailySyncs: 28400, aiQueries: 7230, knowledgeScore: 70,
    connectedBy: 'Siva Prakash', connectedOn: 'Mar 18'
  },
  {
    id: 'messenger', name: 'Messenger', description: 'Customer chat and support',
    category: 'messaging', logoUrl: SI('messenger', '00B2FF'), logoColor: '#e0f5ff',
    status: 'connected', lastSynced: new Date(Date.now() - 22 * 60000),
    recordCount: 2104, dailySyncs: 19200, aiQueries: 5430, knowledgeScore: 68,
    connectedBy: 'Siva Prakash', connectedOn: 'Mar 21'
  },
  {
    id: 'slack', name: 'Slack', description: 'Team notifications and collaboration',
    category: 'productivity', logoUrl: IC('logos:slack-icon'), logoColor: '#f3e8f9',
    status: 'connected', lastSynced: new Date(Date.now() - 5 * 60000),
    recordCount: 6721, dailySyncs: 58300, aiQueries: 14200, knowledgeScore: 85,
    connectedBy: 'Siva Prakash', connectedOn: 'Feb 10'
  },
  {
    id: 'zoom', name: 'Zoom', description: 'Video conferencing and meetings',
    category: 'productivity', logoUrl: SI('zoom', '2D8CFF'), logoColor: '#e6f0ff',
    status: 'not-connected'
  },
  {
    id: 'salesforce', name: 'Salesforce', description: 'Enterprise CRM and sales automation',
    category: 'crm', logoUrl: IC('logos:salesforce'), logoColor: '#e0f5fb',
    status: 'connected', lastSynced: new Date(Date.now() - 30 * 60000),
    recordCount: 8291, dailySyncs: 91200, aiQueries: 15432, knowledgeScore: 91,
    connectedBy: 'Siva Prakash', connectedOn: 'Jan 14'
  },
  {
    id: 'hubspot', name: 'HubSpot', description: 'Marketing, sales, and CRM platform',
    category: 'crm', logoUrl: SI('hubspot', 'FF7A59'), logoColor: '#fff0ec',
    status: 'error',
    lastSynced: new Date(Date.now() - 182 * 60000),
    recordCount: 8241, dailySyncs: 0, aiQueries: 9300, knowledgeScore: 61,
    errorMessage: 'OAuth token expired on May 20, 2026. Re-authentication required.',
    connectedBy: 'Siva Prakash', connectedOn: 'Jan 8'
  },

  // Row 3 — Payments & E-commerce
  {
    id: 'stripe', name: 'Stripe', description: 'Payment processing and billing',
    category: 'payments', logoUrl: SI('stripe', '635BFF'), logoColor: '#eeeeff',
    status: 'connected', lastSynced: new Date(Date.now() - 18 * 60000),
    recordCount: 4109, dailySyncs: 36700, aiQueries: 9870, knowledgeScore: 77,
    connectedBy: 'Siva Prakash', connectedOn: 'Feb 28'
  },
  {
    id: 'square', name: 'Square', description: 'Point of sale and payments',
    category: 'payments', logoUrl: SI('square', '3E4348'), logoColor: '#eeeeee',
    status: 'not-connected'
  },
  {
    id: 'shopify', name: 'Shopify', description: 'E-commerce platform integration',
    category: 'other', logoUrl: SI('shopify', '96BF48'), logoColor: '#eef6e1',
    status: 'connected', lastSynced: new Date(Date.now() - 12 * 60000),
    recordCount: 7823, dailySyncs: 64100, aiQueries: 16200, knowledgeScore: 83,
    connectedBy: 'Siva Prakash', connectedOn: 'Feb 3'
  },
  {
    id: 'zapier', name: 'Zapier', description: 'Workflow automation and app connections',
    category: 'productivity', logoUrl: SI('zapier', 'FF4A00'), logoColor: '#fff0e9',
    status: 'connected', lastSynced: new Date(Date.now() - 45 * 60000),
    recordCount: 1923, dailySyncs: 15800, aiQueries: 4120, knowledgeScore: 72,
    connectedBy: 'Siva Prakash', connectedOn: 'Mar 5'
  },
  {
    id: 'google-calendar', name: 'Google Calendar', description: 'Scheduling and event management',
    category: 'productivity', logoUrl: SI('googlecalendar', '4285F4'), logoColor: '#e8f0fe',
    status: 'connected', lastSynced: new Date(Date.now() - 5 * 60000),
    recordCount: 3241, dailySyncs: 28100, aiQueries: 6721, knowledgeScore: 78,
    connectedBy: 'Siva Prakash', connectedOn: 'Apr 1'
  },
  {
    id: 'google-drive', name: 'Google Drive', description: 'Cloud storage and file sharing',
    category: 'productivity', logoUrl: SI('googledrive', '4285F4'), logoColor: '#e8f0fe',
    status: 'connected', lastSynced: new Date(Date.now() - 8 * 60000),
    recordCount: 1892, dailySyncs: 18920, aiQueries: 4201, knowledgeScore: 71,
    connectedBy: 'Siva Prakash', connectedOn: 'Mar 30'
  },

  // Row 4 — Google & Productivity
  {
    id: 'gmail', name: 'Gmail', description: 'Email integration and automation',
    category: 'productivity', logoUrl: SI('gmail', 'EA4335'), logoColor: '#fdeeec',
    status: 'connected', lastSynced: new Date(Date.now() - 3 * 60000),
    recordCount: 9823, dailySyncs: 102400, aiQueries: 19872, knowledgeScore: 88,
    connectedBy: 'Siva Prakash', connectedOn: 'Jan 22'
  },
  {
    id: 'google', name: 'Google', description: 'Google services and search integration',
    category: 'other', logoUrl: SI('google', '4285F4'), logoColor: '#e8f0fe',
    status: 'connected', lastSynced: new Date(Date.now() - 12 * 60000),
    recordCount: 4521, dailySyncs: 56200, aiQueries: 11234, knowledgeScore: 79,
    connectedBy: 'Siva Prakash', connectedOn: 'Feb 17'
  },
  {
    id: 'microsoft-365', name: 'Microsoft 365', description: 'Office apps and productivity suite',
    category: 'productivity', logoUrl: IC('logos:microsoft-icon'), logoColor: '#fff0e9',
    status: 'not-connected'
  },
  {
    id: 'dropbox', name: 'Dropbox', description: 'Cloud storage and file sync',
    category: 'other', logoUrl: SI('dropbox', '0061FF'), logoColor: '#e0ecff',
    status: 'not-connected'
  },
  {
    id: 'quickbooks', name: 'QuickBooks', description: 'Accounting and bookkeeping',
    category: 'payments', logoUrl: SI('quickbooks', '2CA01C'), logoColor: '#e5f6e5',
    status: 'connected', lastSynced: new Date(Date.now() - 25 * 60000),
    recordCount: 2341, dailySyncs: 21000, aiQueries: 5421, knowledgeScore: 76,
    connectedBy: 'Siva Prakash', connectedOn: 'Mar 12'
  },
  {
    id: 'mailchimp', name: 'Mailchimp', description: 'Email marketing and automation',
    category: 'other', logoUrl: SI('mailchimp', 'FFE01B'), logoColor: '#fffde0',
    status: 'not-connected'
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
  { id: '1', timestamp: new Date(Date.now() - 2 * 60000), recordsProcessed: 1247, duration: 45, status: 'success' },
  { id: '2', timestamp: new Date(Date.now() - 62 * 60000), recordsProcessed: 1183, duration: 42, status: 'success' },
  { id: '3', timestamp: new Date(Date.now() - 122 * 60000), recordsProcessed: 0, duration: 0, status: 'skipped' },
  { id: '4', timestamp: new Date(Date.now() - 182 * 60000), recordsProcessed: 0, duration: 72, status: 'error', errorMessage: 'Rate limit exceeded — retrying in 30 min' },
  { id: '5', timestamp: new Date(Date.now() - 242 * 60000), recordsProcessed: 892, duration: 38, status: 'success' },
  { id: '6', timestamp: new Date(Date.now() - 302 * 60000), recordsProcessed: 1203, duration: 44, status: 'success' },
  { id: '7', timestamp: new Date(Date.now() - 362 * 60000), recordsProcessed: 1156, duration: 41, status: 'success' },
];

export const DISCOVERY_CAPABILITIES: AiCapability[] = [
  { name: 'Social AI', description: 'Schedule and optimize posts automatically using your content data', icon: 'auto_awesome', enabled: false },
  { name: 'Conversations AI', description: 'Manage inbox messages with AI-suggested smart replies', icon: 'chat', enabled: false },
  { name: 'Campaigns AI', description: 'Get ad performance insights and budget optimization tips', icon: 'campaign', enabled: false },
];
