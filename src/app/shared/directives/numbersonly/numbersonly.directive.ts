import { Directive, ElementRef, HostListener } from '@angular/core';
import { FormControl, Validator, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appNumbersonly]',
  providers:[
    {provide:NG_VALIDATORS,useExisting:NumbersonlyDirective}
  ]
})
export class NumbersonlyDirective  implements Validator{
 

  constructor() { }

  
  validate(control: FormControl):ValidationErrors|null {
    return NumbersonlyDirective.validateNumbersOnly(control);
  }
  registerOnValidatorChange?(fn: () => void): void {
    return null;
  }


  /**
   * Validates if the entered value is a number or not.
   * @param control 
   */
  static validateNumbersOnly(control:FormControl):ValidationErrors{
   
    let value=control.value;
    //Ensure that this validation is triggered only if value exists
    if(!value || value.length==0){
      return null;
    }

    let regexNumber:RegExp=new RegExp(/^[+ 0-9]/);
    let isValid=regexNumber.test(value);
    
    return (!isValid)?{numbersonly:"Only numbers are allowed"} as ValidationErrors:null;


  }

}
