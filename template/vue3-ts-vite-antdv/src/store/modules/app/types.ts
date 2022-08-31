import type { Canceler } from 'axios';

export interface AppState {
  processRequests?: Canceler[];
  loading?: boolean;
  cacheViews?: string[];
  [key: string]: any;
}
