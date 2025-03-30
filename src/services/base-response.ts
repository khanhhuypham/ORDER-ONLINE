export interface BaseResponse<T> {
    status: number;
    message: string;
    data: T;
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST'
}

export interface Pagination<T> {
    limit: number;
    total_record: number;
    list: T;
}