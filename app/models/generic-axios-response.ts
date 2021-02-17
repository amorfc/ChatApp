export type GenericAxiosResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: any;
}
