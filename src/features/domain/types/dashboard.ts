export interface DashboardData {
  records: RecordItem[];
  nextPage: string | null;
}

export interface RecordItem {
  id: string;
  s3: {
    totalObjects: number;
    totalSizeBytes: number;
  };
  createdAt: string; // ISO date string
  website: {
    speed: number;
    pages: WebPage[];
  };
  db: {
    programsCount: number;
    active: boolean;
    totalItems: number;
    tableSizeBytes: number;
  };
}

export interface WebPage {
  url: string;
  speed: number;
  screenshot: string;
}
