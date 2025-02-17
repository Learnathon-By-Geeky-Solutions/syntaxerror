export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: 'Admin' | 'Consumer';
    image?: string | null;
    provider?: "local" | "google" ;
    isBlocked?: boolean;
    isVerified?: boolean;
  }
  