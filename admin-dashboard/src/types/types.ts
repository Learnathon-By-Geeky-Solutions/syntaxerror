export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: {
      _id: string;
      name: string;
      image: string;
    } | null;
    stock: number;
    image: string;
    discount: number;
  }
  
  export interface Category {
    _id: string;
    name: string;
    image: string | null;
    createdAt?: string;
  }
  
  export interface PaginationInfo {
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  }

  export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role?: 'Admin' | 'Consumer';
    image?: string | null;
    provider?: "local" | "google" ;
    isBlocked?: boolean;
    isVerified?: boolean;
    createdAt?: string;
  }
  