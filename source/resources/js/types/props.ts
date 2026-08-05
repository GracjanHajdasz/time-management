export type PaginatedData<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type PaginationProps<T> = {
    paginatedData: PaginatedData<T>;
};
