import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/shared/abstract-base/base.component';


@Component({
  selector: 'app-name-weight-card',
  templateUrl: './name-weight-card.component.html',
  styleUrls: ['./name-weight-card.component.scss']
})
export class NameWeightCardComponent extends BaseComponent {


  @Input() name:string;
  @Input() weight:number=0;
  @Input() id:number;
  @Input() userName:string;
  @Output() cardClicked=new EventEmitter<number>();

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

  /**
   * emit id to the parent.
   * 
   */
  onClick(){
    this.cardClicked.emit(this.id);
  }

}
