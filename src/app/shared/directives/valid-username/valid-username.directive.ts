import { Directive } from '@angular/core';
import { Validator, FormControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appValidUsername]',
  providers:[
    {provide:NG_VALIDATORS,useExisting:ValidUsernameDirective}
  ]
})
export class ValidUsernameDirective  implements Validator{

  constructor() { }


  validate(control: FormControl):ValidationErrors|null {
    return ValidUsernameDirective.validateUsername(control);
  }
  registerOnValidatorChange?(fn: () => void): void {
    return null;
  }

  static validateUsername(control:FormControl):ValidationErrors{
//^[a-zA-Z0-9]+(?:[_]?[a-zA-Z0-9])*$

    let value=control.value;
    //Ensure that this validation is triggered only if value exists
    if(!value || value.length==0){
      return null;
    }

    let regexNumber:RegExp=new RegExp(/^[a-zA-Z0-9]+(?:[_]?[a-zA-Z0-9])*$/);
    let isValid=regexNumber.test(value);
    
    return (!isValid)?{notvaliduser:"PLease enter a valid username"} as ValidationErrors:null;
  }
}
