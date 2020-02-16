export interface ServiceRequest<T>{
       //service url
       url:string;
       //generic data place holder
       data:T;
       //delegate message handling to base class
       handleMessages:boolean;//
}