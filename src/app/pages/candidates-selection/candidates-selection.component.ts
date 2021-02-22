import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GridOptions, ICellRendererParams } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { ActionLinkRendererComponent } from '../../shared/frameworks/action-link-renderer/action-link-renderer.component';
import { CandidateMasterModel } from '../../core/modal/candidate-master.modal';
import { CandidatesService } from '../../core/services/candidates.service';
import { TextHighlightRenderer } from '../../shared/frameworks/text-highlight-renderer/text-highlight-renderer.component';
import { ResumeRendererComponent } from '../../shared/frameworks/resume-renderer/resume-renderer.component';
import { JobMasterModel } from '../../core/modal/job-master.model';
import { JobsService } from '../../core/services/jobs.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppliedOtherJobsComponent } from '../../shared/frameworks/applied-other-jobs/applied-other-jobs.component';
import { FormControl, FormGroup } from '@angular/forms';
declare const showLoader:any;
declare const hideLoader:any;

@Component({
  selector: 'app-candidates-selection',
  templateUrl: './candidates-selection.component.html',
  styleUrls: ['./candidates-selection.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CandidatesSelectionComponent implements OnInit {
  public gridApi:any;
  public gridColumnApi:any;
  public model:any;
  public columnDefs:any;
  public autoGroupColumnDef:any;
  public defaultColDef:any;
  public rowSelection;
  public headerCheckboxSelection:any;
  public paginationPageSize;
  public paginationNumberFormatter:any;
  public rowData:any;
  public searchBox:any;
  private candidatesService:CandidatesService;
  public candidatesList:CandidateMasterModel[] = [];
  public params:any;
  public noRowsTemplate:string;
  //public candidateSelection:any;
  public modalRef:any;  
  private jobService:any;
  public rowCount:number=0;
  public gridOptions:any;
  public candidateSelectionFormGroup:any;  

  @Input() values:any
  
  @Output() passDataToParent: EventEmitter<any> = new EventEmitter<any>();
  @Output() screen:EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private elRef:ElementRef,private _jobService:JobsService,private _candidateService: CandidatesService, public modalService:NgbModal,private router:Router) {
    this.jobService = _jobService;
    this.candidatesService = _candidateService;

    //this.modalRef = _modalRef;

    this.noRowsTemplate = "<span></span>";

    this.gridOptions = <GridOptions>{
      context:this
      // context: {
      //     componentChild: this
      // }
  };

    this.columnDefs = [
      {
        headerName: 'Candidate ID',
        field: 'candidateID',
        //maxWidth: 90,
        maxWidth:170,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        cellRendererFramework: TextHighlightRenderer      
      },
      // {
      //   headerName: 'Name',
      //   field: 'athlete',
      //   minWidth: 170,
      //   checkboxSelection: checkboxSelection,
      //   headerCheckboxSelection: headerCheckboxSelection,
      // },
      { headerName: "Candidate Name", field: 'name', maxWidth:241 },
      { headerName: "Contact",field: 'contact', maxWidth:170 },
      { headerName: "Has candidate applied for another job?", maxWidth:296, field: 'other_Interested_Jobs', cellRendererFramework: AppliedOtherJobsComponent },
      { headerName: "Email",field: 'email', maxWidth:225},
      { headerName: "Resume",field: 'resume', maxWidth:110, cellRendererFramework: ResumeRendererComponent, 
      clicked: (params: ICellRendererParams) => {
        parameters: params.data
      //action: this.downloadAttachmentAction
    }   },
    //   { headerName: "Action", cellRendererFramework: ActionLinkRendererComponent, 
    //     clicked: (params: ICellRendererParams) => {
    //       console.log("Params",params);        
    //      parameters: params.data
    //     //action: this.downloadAttachmentAction
    //   }  
    // }  
    ];

    this.defaultColDef = {    
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
    //this.headerCheckboxSelection= true,
    // cellRenderer: 'agGroupCellRenderer',
    // cellRendererParams: { checkbox: true },
    this.rowSelection = 'multiple';
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params:any) {
      return '[' + params.value.toLocaleString() + ']';
    };



   }

   ngOnInit(){
    //this.candidateSelection = this.values;

    this.candidateSelectionFormGroup = new FormGroup({
      jobID: new FormControl(this.values.jobID),
      jobAddedDate: new FormControl(this.values.jobAddedDate),
      customer:new FormControl(this.values.customer),
      jobDescription: new FormControl(this.values.jobDescription),
      jobTitle: new FormControl(this.values.jobTitle),
      jobLocation:new FormControl(this.values.jobLocation),
      currentScreen:new FormControl('Candidate Selection')
    });

  }

   onRowSelect(params:any){    
    this.rowCount = this.gridApi.getSelectedNodes().length;
    }


    ExportToExcel(){
      if(this.gridApi.getSelectedNodes().length>0)
      {
      this.gridApi.exportDataAsCsv({columnKeys:['candidateID', 'name', 'contact', 'email'], onlySelected:true});
      }
      else {
        this.gridApi.exportDataAsCsv({columnKeys:['candidateID', 'name', 'contact', 'email'], onlySelected:false});
      }
    }


ActionLinkFunction (params:any) {
  return '<span style="color:blue;" (click)="onReviewJobCandidates(params)">Review jobs/candidates</span>';
};


onReviewJobCandidates(params:any){    
}

onPageSizeChanged() {
  // var value = document.getElementById('page-size').value();
  var inputValue = (<HTMLInputElement>document.getElementById('page-size-selection')).value;  
  this.gridApi.paginationSetPageSize(Number(inputValue));
}
OnSearch(){
  this.gridApi.setQuickFilter(this.searchBox);
}

 onFilterTextBoxChanged() {
  let val = (<HTMLInputElement>document.getElementById('search-box')).value
  this.gridApi.setQuickFilter(val);
}

onDatePickerChange() {
 
var inputValue = (<HTMLInputElement>document.getElementById('date-picker')).value;

let date= new DatePipe('en-US');

const dateParts = date.transform(inputValue, 'dd/MM/YYYY');
this.gridApi.setQuickFilter(dateParts);

//  let str = inputValue.replace('-','/').replace('-','/');
//  console.log("MyElement", str);
//  str
//  let str2 = str.match(/.{1,4}{1,4}/g);
//  console.log("String2",str2);
//  let str3 = str2.reverse();
//  let str4 = str3.join("");
//  this.gridApi.setQuickFilter(str4);
//  console.log("GridAPI", str4);
}

OnDatePickerClear(){
this.gridApi.setQuickFilter(null);

// this.http
// .get(
//   'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
// )
// .subscribe((data) => {
//   console.log("ROWDATA", data)
//   this.rowData = data;
//   this.gridApi.setRowData(data);
// });
}

OnSubmit(){
let selectedNodes = this.gridApi.getSelectedNodes();

}


// SweetAlert(){

//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'You will not be able to recover this imaginary file!',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, delete it!',
//     cancelButtonText: 'No, keep it'
//   }).then((result) => {
//     if (result.value) {
//       Swal.fire(
//         'Deleted!',
//         'Your imaginary file has been deleted.',
//         'success'
//       )} 
//       else if (result.dismiss === Swal.DismissReason.cancel) {
//       Swal.fire(
//         'Cancelled',
//         'Your imaginary file is safe :)',
//         'error'
//       )
// showLoader();

//   setTimeout(()=>{                           //<<<---using ()=> syntax
//     hideLoader();
// }, 3000);
//     }
//   })  



// }

NotifyCandidates(){
  let candidate_IDs = [];
  let result;
  let selectedNodes:any = this.gridApi.getSelectedNodes();   
   
  if(selectedNodes.length == 0){
    Swal.fire('Alert', 'Atleast one Candidate(s) is to be selected for procession', 'warning');
  } else if(selectedNodes.length > 0){
  for(let i=0; i<selectedNodes.length;i++){
      candidate_IDs.push(selectedNodes[i].data.candidateID);      
  }
  let UserList =  JSON.parse(localStorage.getItem("UserName") || '{}');
  let userId = UserList.bH_User_Id;  
  this.jobService.updateJobTitleLocation(this.values).subscribe((data:any) => {});
  this.candidatesService.SelectCandidates(candidate_IDs, this.values.jobID, userId).subscribe(data=> {    
    //this.modalRef.dismiss();
    this.modalService.dismissAll();  
    Swal.fire('Success', 'Selected candidate(s) will be notified', 'success')  
  });
}
  //Swal.fire('Success', 'Selected candidate(s) notified succesfully!', 'success')  
}

onGridReady(params:any) {  
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this.elRef.nativeElement.querySelector('#loadingCandidateSelection').style.display="block";  
  this.candidatesService.getCandidates(this.values.jobID).subscribe(data => {      
  this.candidatesList = data;
  this.elRef.nativeElement.querySelector('#loadingCandidateSelection').style.display="none";   
  });

  // this.http
  //   .get(
  //     'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
  //   )
  //   .subscribe((data) => {
  //     console.log("ROWDATA", data)
  //     this.rowData = data;
  //     params.api.paginationGoToPage(4);
  //   });
}



  // OnNext(){
  //     this.passDataToParent.emit(this.jobDescription);
  //     this.screen.emit("Candidates Selection");
  // }
  OnPrevious(){
    this.passDataToParent.emit(this.candidateSelectionFormGroup.value);
    this.screen.emit("Job Description");
  }

}
var checkboxSelection = function (params:any) {
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (params:any) {
  return params.columnApi.getRowGroupColumns().length === 0;
};