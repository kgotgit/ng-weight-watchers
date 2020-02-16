export interface ServiceResponse<T>{
    //is false if error or info msgs exists otherwise its true irrespective of succesMsgs exists or not.
    success:boolean;
    //service returs error message(s)
    errorMsgs:string[]|string;
    //service returns success message(s)
    successMsgs:string[]|string;
    // service returns info message(s)
    infoMsgs:string[]|string;
    //payload
    data:T;
}