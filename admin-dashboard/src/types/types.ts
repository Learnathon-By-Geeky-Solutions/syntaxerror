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
  }
  
  export interface PaginationInfo {
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  }