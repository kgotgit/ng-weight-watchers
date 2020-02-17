import { Component, OnInit, Input, ViewEncapsulation, ElementRef } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { IWeightHistory } from '../../models/weight-history.interface';
import { BaseComponent } from 'src/app/core/abstract-base/base.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LineChartComponent extends BaseComponent{

    title = 'Line Chart';

     margin = {top: 20, right: 20, bottom: 30, left: 50};
     width: number;
     height: number;
     xAxis: any;
     yAxis: any;
     svg: any;
     line: d3Shape.Line<[number, number]>;
     _weights:IWeightHistory[];
     hostElement;
    
    constructor(private eleRef:ElementRef) {
        super();
        this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.hostElement=this.eleRef.nativeElement;
    }
    @Input()
    set weights(weights:IWeightHistory[]){
     //Ensure weights data exists.
      if(this.isValidArrayWithData(weights)){
        this._weights=new Array() as IWeightHistory[];
      
        weights.forEach((iw:IWeightHistory)=>{
          let w:IWeightHistory=new Object() as IWeightHistory;
          //convert the date string to Date Object.
          w.lastUpdated=new Date(iw.lastUpdated);
          w.weight=iw.weight;
          this._weights.push(w);
        });
        if(!this.svg){
       //initialize line chart.
        this.initializeChart();
      }else{
        this.updateChart();
      }
      }
    }

    ngOnInit() {
     
       
    }

    /**
     * initalize chart.
     */
    initializeChart(){
      //initialize SVG object
      this.initalizeD3SvgObject();
      //initalize x and y axis
      this.initializeXandYAxis();
      //draw x and y axis
      this.drawXandYAxis();
      //draw line path
      this.drawLineChart();
    }
    /**
     * implement response update to the chart
     */
    updateChart(){
      //TODO:
    }
    /**
     *  //initialize SVG object
     */
    private initalizeD3SvgObject() {
        this.svg = d3.select(this.hostElement).append('svg').attr("height","500").attr("width","900")
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }
    /**
     *  //initalize x and y axis
     */
    private initializeXandYAxis() {
        this.xAxis = d3Scale.scaleTime().range([0, this.width]);
        this.yAxis = d3Scale.scaleLinear().range([this.height, 0]);
        this.xAxis.domain(d3Array.extent(this._weights, (d:IWeightHistory) => <Date>d.lastUpdated ));
        this.yAxis.domain(d3Array.extent(this._weights, (d:IWeightHistory) => d.weight ));
    }
    /**
     * draw x and y axis
     */
    private drawXandYAxis() {
        //draw x axis line
        this.svg.append('g')
            //set class
            .attr('class', 'axis x--axis')
            //transform to horizontal line
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.xAxis));
        //draw y axis line
        this.svg.append('g')
            .attr('class', 'axis y--axis')
            .call(d3Axis.axisLeft(this.yAxis))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 8)
            .attr('dy', '.50em')
            .style('text-anchor', 'end')
            .text('Weight (lbs)');//weight label to be shown on y-axis
    }

    /**
     * Draw linechart
     */
    private drawLineChart() {
        //draw the line with x with lastUpdated date and y-axis with weights.
        this.line = d3Shape.line()
            .x( (d: any) => this.xAxis(d.lastUpdated) )
            .y( (d: any) => this.yAxis(d.weight) );
        //to plot path using the data points provided
        this.svg.append('path')
            .datum(this._weights)
            .attr('class', 'line')
            .attr('d', this.line);
    }

    ngOnDestroy(){
      super.ngOnDestroy();
      console.log("ngDestroy called");
      d3.selectAll("svg > *").remove();
      d3.select(this.hostElement).select('svg').remove();
      this.svg.selectAll("*").remove();
      //this.svg=null;
    }

}
