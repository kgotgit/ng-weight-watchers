export interface ServiceRequest<T>{
       //generic data place holder
       data:T;
       //delegate error handling to base class
       handleError:boolean;//
}