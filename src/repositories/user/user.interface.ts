export interface UserProfile {
  id: string;
  name: string;
  books: {
    id: string;
    name: string;
  }
}
