import { IWeightHistory } from './weight-history.interface';
//Holds person details and weight histry details
export interface IPersonDetails{
    id:number;//assuming mocked data will have unique id
    name:string;
    username:string;
    age:number;
    weight:number;
    lastUpdated:Date;
    imgSrc:string;
    history:IWeightHistory[];
}