export interface Client {
  id: string;
  name: string;
  category: string;
  description?: string;
  media_url?: string;
  jobTitle?: string;
  country?: string;
  website?: string;
}

export interface ClientCategory {
  id: string;
  name: string;
  clients: Client[];
}

export interface ClientsData {
  categories: ClientCategory[];
}
