import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-text-highlight-renderer',
  templateUrl: './text-highlight-renderer.component.html',
  //template: '<span *ngIf="isJobID" style="color:#232f71;"><b>{{value}}</b></span> <span *ngIf="isnumOfOpenings" style="color:#232f71;"><b>{{value}}</b></span>',
  //styleUrls: ['./action-link-tbrcell-renderer.component.scss']
})
export class TextHighlightRenderer implements ICellRendererAngularComp  {

  public params: any;
  public value:number=0;
  
  public isJobID:boolean=false;
  public isnumOfOpenings:boolean=false;
  public isCandidateView:boolean=false;

  agInit(params: any): void {

    switch(params.colDef.headerName){
      case "Job ID":
        this.isJobID = true;
        this.isnumOfOpenings = false;
        this.isCandidateView = false; 
        this.value = params.value;   
         break;
        
      case "Total Openings":
        this.isnumOfOpenings = true;
        this.isJobID = false;
        this.isCandidateView = false;
        this.value = params.value;
        break;

        case "Candidate ID":   
          this.isCandidateView = true;         
          this.isnumOfOpenings = false;
          this.isJobID = false;          
          this.value = params.value;
          break;

    }
   
  }

  constructor() {}

  refresh(): boolean {
    return false;
  }

}
