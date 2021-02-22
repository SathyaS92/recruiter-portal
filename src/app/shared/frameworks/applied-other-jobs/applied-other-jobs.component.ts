import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-applied-other-jobs',
  templateUrl: './applied-other-jobs.component.html',
  styleUrls: ['./applied-other-jobs.component.scss']
})
export class AppliedOtherJobsComponent implements ICellRendererAngularComp  {

  public params:any;
  public candidateID:number=0;
  public jobTitle:string="";

  constructor(private modalService: NgbModal) { }

  agInit(params: any): void {  
    this.params = params;      
}

refresh(params: any): boolean {
  throw new Error('Method not implemented.');
}

detailedView(content:any, params:any){
 let parameters = params.data;
 this.candidateID = parameters.candidateID;
 //this.jobTitle = parameters.jobTitle;
  const modalRef = this.modalService.open(content, { size: 'lg'}).result.then((result) => {
    //console.log('DIV', this.divID);
     // this.divID.nativeElement.innerHTML=parameters.data.value;    
  }, (reason) => {
    //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

}
