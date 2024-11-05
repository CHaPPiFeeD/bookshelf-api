export interface UserProfile {
  id: string;
  name: string;
  description: string | null;
  books_count: number;
}

export interface UpdateUserProfileData {
  name: string;
  description: string;
}
