import { Component, ElementRef, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { JobsService } from '../../../core/services/jobs.service';
import { DataTransferService } from 'src/app/data-transfer.service';

@Component({
  selector: 'app-action-link-renderer',
  templateUrl: './action-link-renderer.component.html',
  styleUrls: ['./action-link-renderer.component.scss'],
  //encapsulation: ViewEncapsulation.Emulated
})
export class ActionLinkRendererComponent implements ICellRendererAngularComp {

  public params: any;
  public rowData:any;
  public tobeReviewedJobService:any;
  private selectedFilter:string="";
  //private router:any;
  //public jobID:number=0;
  @Output() modalClose: EventEmitter<boolean> = new EventEmitter<boolean>();


  agInit(params: any): void {    
      this.params = params;      
  }

  constructor(private router:Router, private elRef:ElementRef, private modalService: NgbModal,private dataTransferService:DataTransferService,private _toBeReviewedJobsService: JobsService) {
    this.tobeReviewedJobService = _toBeReviewedJobsService;
  }

  refresh(): boolean {
    return false;
  }
  public onReviewJobCandidates(content:any, parameters:any){
    
     this.rowData = parameters.data;
    
    //this.modalService.activeInstances.arguments
    const modalRef = this.modalService.open(content, { size: 'lg', centered:true ,ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      //modalRef.componentInstance.name = 'World'; 
      //alert(1);
    }, (reason) => {
      let close = true;      

      let UserList =  JSON.parse(localStorage.getItem("UserName") || '{}');
      let userID = UserList.bH_User_Id;
      let clientIDsWithDelimiter = UserList.client_ID;
      let clientIDs = clientIDsWithDelimiter.split('|').join(",");
      let selectedFilter = this.selectedFilter; 

      this.tobeReviewedJobService.getJobs(userID, clientIDs).subscribe((data: any) => {      
        this.params.context.componentParent.gridOptions.rowData = data
        this.params.context.componentParent.gridOptions.api.setRowData(data);
        //params.api.paginationSetPageSize(10);
        //hideLoader();    
      });

      //this.router.navigate['/toBeReviewedJobs']; 
     //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //modalRef.componentInstance.name = 'World';
    
  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }


}
