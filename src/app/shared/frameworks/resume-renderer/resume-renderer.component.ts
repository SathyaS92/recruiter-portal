import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-resume-renderer',
  templateUrl: './resume-renderer.component.html',
  styleUrls: ['./resume-renderer.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class ResumeRendererComponent implements ICellRendererAngularComp {

  //headerValue:string="";
  params:any;
  values:any;

 // @ViewChild('divID') divID!: ElementRef;

  agInit(params: any): void {
    //this.notifyCount = params.value;  
    // console.log("PARAMETERS", params);
    // this.headerValue = params.colDef.headerName;
    //console.log("Parame", params);  
    this.params = params;        
  }

  constructor(private modalService: NgbModal) {}

  refresh(): boolean {
    return false;
  }

  public OnResumeClick(resume:any, parameters:any){      
    this.values = parameters.value;
   //this.modalService.activeInstances.arguments
   const modalRef = this.modalService.open(resume, { size: 'lg'}).result.then((result) => {
     //console.log('DIV', this.divID);
      // this.divID.nativeElement.innerHTML=parameters.data.value;    
   }, (reason) => {
     //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });

   //modalRef.componentInstance.name = 'World';
   
 }

}
