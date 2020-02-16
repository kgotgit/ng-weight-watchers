export interface IMessage{
    type:'error'|'success'|'info';
    message:string;
    key?:string;//unique identifier for message, its an optional field.
}