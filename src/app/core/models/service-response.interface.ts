export interface ServiceResponse<T>{
    success:boolean;
    error:string[]|string;
    data:T;
}