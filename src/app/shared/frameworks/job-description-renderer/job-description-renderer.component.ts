import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Context } from 'ag-grid-community';

@Component({
  selector: 'app-job-description-renderer',
  templateUrl: './job-description-renderer.component.html',
  styleUrls: ['./job-description-renderer.component.scss']
})
export class JobDescriptionRendererComponent implements ICellRendererAngularComp {

  public params: any;
  public jobDescription:string="";

  agInit(params: any): void {
    let strippedJobDescription = this.removeHTML(params.value);    
    this.jobDescription = strippedJobDescription;   
  }

  removeHTML(str:string){ 
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  }


  constructor() {}

  refresh(): boolean {
    return false;
  }
}
