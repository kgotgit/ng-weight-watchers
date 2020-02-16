import { OnDestroy, OnInit } from '@angular/core';
import { AbstractBaseUtil } from './base.util';

export abstract class BaseComponent extends AbstractBaseUtil implements OnInit, OnDestroy{
   
    
    
    constructor(){
        super();
    }

    /**
     * Child classes may override
     */
    ngOnInit(): void {
       
    }

    /**
     * Child classes may use subsink to add any observable stream subscriptons.
     * When method is override by child class, may call super.ngOnDestory() to clear all subscriptions 
     * added to subsink or _destory$ subject unless need to handle by itself. 
     */
    ngOnDestroy(): void {
        super.subsink.unsubscribe();
        super._destroy$.next();
        super._destroy$.complete();
    }
    
}