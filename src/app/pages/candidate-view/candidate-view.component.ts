import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { GridOptions, ICellRendererParams } from 'ag-grid-community';
import { CandidateMasterModel } from '../../core/modal/candidate-master.modal';
import { CandidatesService } from '../../core/services/candidates.service';

import { ResumeRendererComponent } from '../../shared/frameworks/resume-renderer/resume-renderer.component';
import { DataTransferService } from 'src/app/data-transfer.service';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { TextHighlightRenderer } from 'src/app/shared/frameworks/text-highlight-renderer/text-highlight-renderer.component';
declare const showLoader:any;
declare const hideLoader:any;

@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.scss']
})
export class CandidateViewComponent implements OnInit {

  public jobDetails:any;
  public jobID:number=0;
  public serviceName:any;
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
  public gridOptions;
  private candidatesService:CandidatesService;
  public candidatesList:CandidateMasterModel[] = [];
  public params:any;
  public noRowsTemplate:any;
  public candidateSelection:any;
  public modalRef:any;
  private flag:boolean=true;
  private alive:boolean=true;

  constructor(private route : ActivatedRoute, private router:Router ,private _candidateService: CandidatesService,private modalService: NgbModal, private dataTransferService:DataTransferService) { 
    //let jobID = this.router.getCurrentNavigation()?.extras.state?.jobID;
    
    this.jobDetails =  JSON.parse(this.route.snapshot.params['jobDetails']); 

    this.noRowsTemplate = "<span></span>";



    //console.log("JobDetails", this.jobDetails)
    this.jobID = this.jobDetails.jobID;
    // alert(this.jobID);
    this.serviceName = this.route.snapshot.paramMap.get('serviceName');

    switch(this.serviceName){
      case "Notified Candidates":
        dataTransferService.candidateTitleUpdate("Notified Candidates");
        break;
      case "Yet To Be Notified Candidates":
        dataTransferService.candidateTitleUpdate("Yet To Be Notified Candidates");
        break;
      case "Interested Candidates":
        dataTransferService.candidateTitleUpdate("Interested Candidates");
        break;
      case "Not Responded Candidates":
        dataTransferService.candidateTitleUpdate("Not Responded Candidates");
        break;
    }


    this.candidatesService = _candidateService;

    //this.modalRef = _modalRef;

    this.gridOptions = <GridOptions>{
      context:this
      // context: {
      //     componentChild: this
      // }
  };

    

    if(this.serviceName == "Interested Candidates"){
      this.columnDefs = [
        {
          headerCheckboxSelection: true,
          checkboxSelection: true,
          maxWidth:70
       },
       {
         headerName: 'Candidate ID',
         field: 'candidateID',
         //maxWidth: 90,
         maxWidth:170,
         cellRendererFramework: TextHighlightRenderer      
       },
       // {
       //   headerName: 'Name',
       //   field: 'athlete',
       //   minWidth: 170,
       //   checkboxSelection: checkboxSelection,
       //   headerCheckboxSelection: headerCheckboxSelection,
       // },
       { headerName: "Candidate Name", field: 'name' },
       { headerName: "Contact",field: 'contact' },
       { headerName: "Email",field: 'email', maxWidth:322 },
       { headerName: "Resume",field: 'resume', cellRendererFramework: ResumeRendererComponent, 
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
    } else if(this.serviceName == "Yet To Be Notified Candidates"){

    this.columnDefs = [
       //{
      //   headerCheckboxSelection: true,
      //   checkboxSelection: true,
      //},
      {
        headerName: 'Candidate ID',
        field: 'candidateID',
        //maxWidth: 90,
        maxWidth:170,
        cellRendererFramework: TextHighlightRenderer      
      },
       
      
      // {
      //   headerName: 'Name',
      //   field: 'athlete',
      //   minWidth: 170,
      //   checkboxSelection: checkboxSelection,
      //   headerCheckboxSelection: headerCheckboxSelection,
      // },
      { headerName: "Candidate Name", field: 'name' },
      { headerName: "Contact",field: 'contact' },
      { headerName: "Email",field: 'email', maxWidth:322 },
      { headerName: "Resume",field: 'resume', cellRendererFramework: ResumeRendererComponent, 
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
    else if(this.serviceName == "Notified Candidates"){
      this.columnDefs = [
        //{
       //   headerCheckboxSelection: true,
       //   checkboxSelection: true,
       //},
       {
         headerName: 'Candidate ID',
         field: 'candidateID',
         //maxWidth: 90,
         maxWidth:170,
         cellRendererFramework: TextHighlightRenderer      
       },
       // {
       //   headerName: 'Name',
       //   field: 'athlete',
       //   minWidth: 170,
       //   checkboxSelection: checkboxSelection,
       //   headerCheckboxSelection: headerCheckboxSelection,
       // },
       { headerName: "Candidate Name", field: 'name' },
       { headerName: "Contact",field: 'contact' },
       { headerName: "Email",field: 'email', maxWidth:322 },
       { headerName: "Resume",field: 'resume', cellRendererFramework: ResumeRendererComponent, 
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
    else if(this.serviceName == "Not Responded Candidates"){
      this.columnDefs = [
        //{
       //   headerCheckboxSelection: true,
       //   checkboxSelection: true,
       //},
       {
         headerName: 'Candidate ID',
         field: 'candidateID',
         //maxWidth: 90,
         maxWidth:170,
         cellRendererFramework: TextHighlightRenderer      
       },
       // {
       //   headerName: 'Name',
       //   field: 'athlete',
       //   minWidth: 170,
       //   checkboxSelection: checkboxSelection,
       //   headerCheckboxSelection: headerCheckboxSelection,
       // },
       { headerName: "Candidate Name", field: 'name', tooltipField: 'name' },
       { headerName: "Contact",field: 'contact' },
       { headerName: "Email",field: 'email', maxWidth:322, tooltipField: 'email' },
       { headerName: "Resume",field: 'resume', cellRendererFramework: ResumeRendererComponent, 
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


    
   }

  ngOnInit(): void {
      // this.candidatesList = Observable.interval(10000);
      this.flag=true;
      this.OnRefresh();
  }

  ngAfterViewInit(){
    this.dataTransferService.currentSearchValue.pipe(takeWhile(() => this.alive)).subscribe((data:any) => { 
      this.gridOptions.context.gridApi?.setQuickFilter(data);
      //this.searchData = data;
      //this.SearchData();
      //this.gridApi.setQuickFilter(data); 
    })

    this.dataTransferService.currentDateValue.pipe(takeWhile(() => this.alive)).subscribe((data:any) => { 
      this.gridOptions.context.gridApi?.setQuickFilter(data);
      //this.searchData = data;
      //this.SearchData();
      //this.gridApi.setQuickFilter(data); 
    })

     this.dataTransferService.currentRefresh.pipe(takeWhile(() => this.alive)).subscribe((data:string) => {
      this.candidatesService.GetCandidateNotificationStatus(this.jobID, this.serviceName).subscribe(data => {      
        this.candidatesList = data;  
        if(this.serviceName != "Yet To Be Notified Candidates" && this.jobDetails.jobStatus == "Recruiter_Approved"){
        this.noRowsTemplate = "<div class='outline' style='border: 1px dashed #121F65;width: 80%;padding-top: 8%;padding-bottom: 8%;margin-top: 3.5%;'><span style='color:#121F65;font-size:1.8em'><b>Notification in progress</b></span></div>";
        }
        else if(this.jobDetails.jobStatus != "Recruiter_Approved"){
          this.noRowsTemplate = "<span><b>No Records to show</b></span>";
        }        
      });
    })

  }

  ngOnDestroy(): void {
    // this.candidatesList = Observable.interval(10000);
    this.alive = false;
    this.flag=false;
}

  onRowSelect(params:any){    
}

ActionLinkFunction (params:any) {
return '<span style="color:blue;" (click)="onReviewJobCandidates(params)">Review jobs/candidates</span>';
};


onReviewJobCandidates(params:any){  
}

OnShortlist(){
  let candidate_IDs = [];
  let result;
  let selectedNodes:any = this.gridApi.getSelectedNodes();    
  for(let i=0; i<selectedNodes.length;i++){
      candidate_IDs.push(selectedNodes[i].data.candidateID);      
  }  
  // this.candidatesService.SelectCandidates(candidate_IDs,  this.jobID).subscribe(data=> {    
  //   Swal.fire('Success', 'Selected candidate(s) shortlisted successfully!', 'success')  
  // });
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

onPageSizeChanged() {
// var value = document.getElementById('page-size').value();
var inputValue = (<HTMLInputElement>document.getElementById('page-size')).value;
this.gridApi.paginationSetPageSize(Number(inputValue));
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

SweetAlert(){

Swal.fire({
  title: 'Are you sure?',
  text: 'You will not be able to recover this imaginary file!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then((result) => {
  if (result.value) {
    Swal.fire(
      'Deleted!',
      'Your imaginary file has been deleted.',
      'success'
    )} 
    else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
showLoader();

setTimeout(()=>{                           //<<<---using ()=> syntax
  hideLoader();
}, 3000);
  }
})  



}

// NotifyCandidates(){
// let candidate_IDs = [];
// let result;
// let selectedNodes = this.gridApi.getSelectedNodes();
// console.log("SelectedNodes", selectedNodes);
// for(let i=0; i<selectedNodes.length;i++){
//      candidate_IDs.push(selectedNodes[i].data.candidateID);
// }
// this.candidatesService.SelectCandidates(candidate_IDs).subscribe(data=> {
//   console.log(data);
//   //this.modalRef.dismiss();
//   Swal.fire('Success', 'Selected candidate(s) notified succesfully!', 'success')  
// });
// //Swal.fire('Success', 'Selected candidate(s) notified succesfully!', 'success')  
// }

onGridReady(params:any) {
this.gridApi = params.api;
this.gridColumnApi = params.columnApi;
showLoader();
this.candidatesService.GetCandidateNotificationStatus(this.jobID, this.serviceName).subscribe(data => {      
  this.candidatesList = data;  
  if(this.serviceName != "Yet To Be Notified Candidates" && this.jobDetails.jobStatus == "Recruiter_Approved"){
  this.noRowsTemplate = "<div class='outline' style='border: 1px dashed #121F65;width: 80%;padding-top: 8%;padding-bottom: 8%;margin-top: 3.5%;'><span style='color:#121F65;font-size:1.8em'><b>Notification in progress</b></span></div>";
  }
  else if(this.jobDetails.jobStatus != "Recruiter_Approved"){
    this.noRowsTemplate = "<span><b>No Records to show</b></span>";
  }
  hideLoader();    
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

OnViewMoreClick(resume:any, parameters:any){  

  const modalRef = this.modalService.open(resume, { size: 'lg'}).result.then((result) => {
    //console.log('DIV', this.divID);
     // this.divID.nativeElement.innerHTML=parameters.data.value;    
  }, (reason) => {
    //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

OnRefresh(){  
  this.candidatesService.GetCandidateNotificationStatus(this.jobID, this.serviceName).subscribe(data => {      
    this.candidatesList = data;  
    if(this.serviceName != "Yet To Be Notified Candidates" && this.jobDetails.jobStatus == "Recruiter_Approved"){
    this.noRowsTemplate = "<div class='outline' style='border: 1px dashed #121F65;width: 80%;padding-top: 8%;padding-bottom: 8%;margin-top: 3.5%;'><span style='color:#121F65;font-size:1.8em'><b>Notification in progress</b></span></div>";
    }
    else if(this.jobDetails.jobStatus != "Recruiter_Approved"){
      this.noRowsTemplate = "<span><b>No Records to show</b></span>";
    }      
    this.gridApi.setRowData(data);
  });

  setTimeout(() => {
    if(this.flag){
       this.OnRefresh();
    }
   }, 7000);
}

OnPrevious(){
  let url = this.router.url;
   if(url.includes("processedJobs")){
    this.router.navigateByUrl('/processedJobs');
   }
   else if(url.includes("closedJobs")){
     this.router.navigateByUrl('/closedJobs');
   }     
}

// OnNext(){
//     this.passDataToParent.emit(this.jobDescription);
//     this.screen.emit("Candidates Selection");
// }

}
