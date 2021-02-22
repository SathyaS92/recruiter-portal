import { Component,OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import {JobsService} from '../../core/services/jobs.service';
import { JobMasterModel } from '../../core/modal/job-master.model';
import { TextHighlightRenderer } from '../../shared/frameworks/text-highlight-renderer/text-highlight-renderer.component';
import { ActionLinkRendererComponent } from '../../shared/frameworks/action-link-renderer/action-link-renderer.component';
import { GridOptions, ICellRendererParams } from 'ag-grid-community';
import { DataTransferService } from 'src/app/data-transfer.service';
import { JobDescriptionRendererComponent } from '../../shared/frameworks/job-description-renderer/job-description-renderer.component';
import { CustomTooltip } from '../custom-tooltip/custom-tooltip.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Compiler} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationComponent } from 'src/app/shared/frameworks/notification/notification.component';

declare const showLoader:any;
declare const hideLoader:any;

@Component({
  selector: 'app-to-be-reviewed-jobs',
  templateUrl: './to-be-reviewed-jobs.component.html',
  styleUrls: ['./to-be-reviewed-jobs.component.scss'],
  //encapsulation: ViewEncapsulation.None
  encapsulation: ViewEncapsulation.Emulated
})
export class ToBeReviewedJobsComponent implements OnInit {


  public gridApi:any;
  public gridColumnApi:any;
  public model:any;
  public columnDefs:any;
  public autoGroupColumnDef:any;
  public defaultColDef:any;
  public rowSelection;
  public paginationPageSize;
  private userID:number=0;
  public paginationNumberFormatter:any;
  public rowData:any;
  public searchBox:any;
  private ToBeReviewedJobsService:JobsService;
  public jobLists:JobMasterModel[] = [];
  public params:any;
  public noRowsTemplate:string;
  public gridOptions;
  public hello:string="";
  public tooltipShowDelay:any;
  public searchData:string="";
  public frameworkComponents:any;
  private selectedFilter:string="";
  public currentCellJobDescription:any;
  private flag:boolean=false;
  private alive:boolean=true;
  private clientIDS:string="";
  
  @ViewChild('content', { static: false }) public content:any;

  constructor(private http: HttpClient, private _toBeReviewedJobsService: JobsService, private router:Router,private modalService: NgbModal, private dataTransferService:DataTransferService) {     
    
    let UserList =  JSON.parse(localStorage.getItem("UserName") || '{}');
    let IDswithDelimiter = UserList.client_ID;
    this.clientIDS = IDswithDelimiter.split('|').join(","); 

    this.dataTransferService.updateUserName(UserList.first_name);
        
    this.ToBeReviewedJobsService = _toBeReviewedJobsService;

    this.noRowsTemplate = "<span></span>";

    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
  };

    if(this.hello != "") {
      //alert(3);
    }

    this.columnDefs = [
      {
        headerName: 'Job ID',
        field: 'jobID',
        minWidth: 92,
        maxWidth: 92,
        cellRendererFramework: TextHighlightRenderer      
      },
      // {
      //   headerName: 'Name',
      //   field: 'athlete',
      //   minWidth: 170,
      //   checkboxSelection: checkboxSelection,
      //   headerCheckboxSelection: headerCheckboxSelection,
      // },
      { headerName: "Job Title",minWidth:134, field: 'jobTitle', tooltipField: 'jobTitle'},
      { headerName: "Customer", minWidth:134,field: 'customer', tooltipField: 'customer'},
      { headerName: "Job Description", minWidth:166,field: 'jobDescription', onCellClicked: this.ViewDescriptionOnModel.bind(this), cellRendererFramework: JobDescriptionRendererComponent},
      { headerName: "Job Location", minWidth:134,field: 'jobLocation', tooltipField: 'jobLocation' },
      { headerName: "Job Added Date", minWidth:156,field: 'jobAddedDate' },
      { headerName: "Total Openings", minWidth:158,field: 'numOfOpenings', cellRendererFramework: TextHighlightRenderer },
      { headerName: "Status", minWidth:190,field: 'jobStatus',tooltipField: 'jobStatus'},
      { headerName: "Action", maxWidth:184,pinned:'right',cellRendererFramework: ActionLinkRendererComponent, 
        clicked: (params: ICellRendererParams) => {             
         parameters: params.data
        //action: this.downloadAttachmentAction
      }  
    }  
    ];    

    this.defaultColDef = {    
      sortable: true,
      suppressHorizontalScroll: false,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
      //tooltipComponent: 'customTooltip',
    };
    this.tooltipShowDelay = 0;
    //this.frameworkComponents = { customTooltip: CustomTooltip };
    this.rowSelection = 'multiple';
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params:any) {
      return '[' + params.value.toLocaleString() + ']';
    };
    
}

ngOnInit(): void {
  this.flag=true;  
  let UserList =  JSON.parse(localStorage.getItem("UserName") || '{}');
  this.userID = UserList.bH_User_Id;  
 
  //this.OnRefresh();
}

  ngAfterViewInit(){
    this.dataTransferService.currentSearchValue.pipe(takeWhile(() => this.alive)).subscribe((data:any) => { 
      this.gridOptions.api?.setQuickFilter(data);
      //this.searchData = data;
      //this.SearchData();
      //this.gridApi.setQuickFilter(data); 
    })

    this.dataTransferService.currentDateValue.pipe(takeWhile(() => this.alive)).subscribe((data:any) => { 
      this.gridOptions.api?.setQuickFilter(data);
      //this.searchData = data;
      //this.SearchData();
      //this.gridApi.setQuickFilter(data); 
    })

    this.dataTransferService.clearDataSource.pipe(takeWhile(() => this.alive)).subscribe((val:any) => {
      this.gridOptions.api?.setQuickFilter(null);
      // this.ToBeReviewedJobsService.getJobs().subscribe(data => {      
      //   console.log("DATAS", data);
      //   this.gridOptions.api?.setRowData(data);
      //   //params.api.paginationSetPageSize(10);
      //   hideLoader();    
      // });
    })

    this.dataTransferService.currentRefresh.pipe(takeWhile(() => this.alive)).subscribe((data:string) => { 
      if(data == "toBeReviewed"){   
      this.ToBeReviewedJobsService.getJobs(this.userID, this.clientIDS).subscribe(data => {                    
        this.gridOptions.api?.setRowData(data);
        //params.api.paginationSetPageSize(10);        
      });
    }
    })

  }

  ngOnDestroy(){
    this.alive=false;
    this.flag=false;
  }

  OnRefresh(){
    this.ToBeReviewedJobsService.getJobs(this.userID,this.clientIDS).subscribe(data => {               
      this.jobLists = data;
      this.gridApi.refreshCells();
      //this.gridApi.setRowData(data);
      //params.api.paginationSetPageSize(10);      
    });

    setTimeout(() => {
      if(this.flag){
         this.OnRefresh();
      }
     }, 10000);
  }


  ViewDescriptionOnModel(event:any){
      let options: NgbModalOptions = {
        size: 'lg'
      };
   this.currentCellJobDescription = event.value;
      this.modalService.open(this.content, options);
  }

  onRowSelect(params:any){
  }

  ActionLinkFunction (params:any) {
    return '<span style="color:blue;" (click)="onReviewJobCandidates(params)">Review jobs/candidates</span>';
  };


  onReviewJobCandidates(params:any){
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




  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    showLoader();
  
    this.ToBeReviewedJobsService.getJobs(this.userID,this.clientIDS).subscribe(data => {          
      this.jobLists = data;
      //params.api.paginationSetPageSize(10);
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
}
var checkboxSelection = function (params:any) {
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (params:any) {
  return params.columnApi.getRowGroupColumns().length === 0;
};