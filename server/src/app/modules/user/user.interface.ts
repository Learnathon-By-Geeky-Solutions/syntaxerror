export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'Admin' | 'Consumer';
    image?: string | null;
    isBlocked?: boolean;
  }
  