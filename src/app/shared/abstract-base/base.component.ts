import { OnDestroy, OnInit } from '@angular/core';
import { AbstractBaseUtil } from './base.util';

export abstract class BaseComponent extends AbstractBaseUtil implements OnInit, OnDestroy{
   
    
    
    constructor(){
        super();
    }

    /**
     * Child classes should override
     */
    ngOnInit(): void {
       
    }

    /**
     * Child classes should subsink to add any subscriptons.
     * When method is override by child class, ensure super.ngOnDestory() is called. 
     */
    ngOnDestroy(): void {
        super.subsink.unsubscribe();
    }
    
}