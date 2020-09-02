export interface BookInterface {
  id?: number;
  title: string;
  releasedYear: number;
  averageNote?: number;
  description?: string;
  imageUrl?: string;
  author: string;
  publishingHouse: string;
}
