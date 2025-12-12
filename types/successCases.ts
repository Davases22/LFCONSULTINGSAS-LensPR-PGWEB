export interface SuccessCase {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  client?: string;
  category?: string;
  date?: string;
  tags?: string[];
}

export interface SuccessCasesResponse {
  cases: SuccessCase[];
  total: number;
}
