export interface PaginationParams {
     limit: number;
     page: number;
     total: number
}
export interface ListReponse<T> {
     data: T[];
     pagination: PaginationParams;
}