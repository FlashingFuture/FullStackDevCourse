export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryList {
  id: number;
  name: string;
}

export interface CategoryListResponse {
  categories: CategoryList[];
}

export interface CreateCategoryDto {
  name: string;
  description: string;
}

export interface UpdateCategoryDto {
  id: number;
  name?: string;
  description?: string;
}
