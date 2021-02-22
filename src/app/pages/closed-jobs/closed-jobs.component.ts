import { Component,OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { JobMasterModel } from '../../core/modal/job-master.model';
import { JobsService } from '../../core/services/jobs.service';

import { NotificationComponent } from '../../shared/frameworks/notification/notification.component';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { DataTransferService } from 'src/app/data-transfer.service';
import { JobDescriptionRendererComponent } from '../../shared/frameworks/job-description-renderer/job-description-renderer.component';
import { CustomTooltip } from '../custom-tooltip/custom-tooltip.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { TextHighlightRenderer } from 'src/app/shared/frameworks/text-highlight-renderer/text-highlight-renderer.component';
declare const showLoader:any;
declare const hideLoader:any;

@Component({
  selector: 'app-closed-jobs',
  templateUrl: './closed-jobs.component.html',
  styleUrls: ['./closed-jobs.component.scss']
})
export class ClosedJobsComponent implements OnInit {

  public gridApi:any;
  public gridOptions;
  public gridColumnApi:any;
  public model:any;
  public columnDefs:any;
  public autoGroupColumnDef:any;
  public defaultColDef:any;
  public rowSelection;
  public paginationPageSize;
  public paginationNumberFormatter:any;
  public rowData:any;
  public searchBox:any;
  public noRowsTemplate:string;
  public tooltipShowDelay:any;
  private closedJobsService:JobsService;
  public jobLists:JobMasterModel[] = [];
  public frameworkComponents:any;
  public currentCellJobDescription:any;
  private flag:boolean=false;
  private selectedFilter:string="";
  private clientIDS:string="";
  private userID:number=0;
  private alive:boolean=true;

  @ViewChild('content', { static: false }) public content:any;

  constructor(private http: HttpClient, _closedJobsService:JobsService, private router:Router, private modalService: NgbModal,private dataTransferService:DataTransferService) { 

    this.closedJobsService = _closedJobsService;    

    let UserList =  JSON.parse(localStorage.getItem("UserName") || '{}');
    let IDswithDelimiter = UserList.client_ID;
    this.clientIDS = IDswithDelimiter.split('|').join(",");     

    this.dataTransferService.updateUserName(UserList.first_name);

    this.noRowsTemplate = "<span></span>";
    
    this.gridOptions = <GridOptions>{
      context:this
      // context: {
      //     componentChild: this
      // }
  };

    this.columnDefs = [
      {
        headerName: 'Job ID',
        field: 'jobID',
        pinned: 'left',
        minWidth: 92,  
        maxWidth: 92, 
        // minWidth: 170,  
        cellRendererFramework: TextHighlightRenderer    
      },
      // {
      //   headerName: 'Name',
      //   field: 'athlete',
      //   minWidth: 170,
      //   checkboxSelection: checkboxSelection,
      //   headerCheckboxSelection: headerCheckboxSelection,
      // },
      { headerName: "Job Title", minWidth:165, maxWidth:165, pinned:'left', field: 'jobTitle', tooltipField: 'jobTitle'},
      { headerName: "Customer", minWidth:184,field: 'customer', tooltipField: 'customer' },
      { headerName: "Job Description", minWidth:192,field: 'jobDescription', onCellClicked: this.ViewDescriptionOnModel.bind(this),cellRendererFramework: JobDescriptionRendererComponent },
      { headerName: "Job Location", minWidth:170,field: 'jobLocation', tooltipField: 'jobLocation' },
      //{ headerName: "Total Openings", minWidth:151,field: 'numOfOpenings',cellRendererFramework: TextHighlightRenderer },
      { headerName: "Notified Candidates", minWidth:188,cellRendererFramework: NotificationComponent },
      { headerName: "Yet to be Notified Candidates", minWidth:240, cellRendererFramework: NotificationComponent },
      { headerName: "Interested Candidates", minWidth:194,cellRendererFramework: NotificationComponent  },
      { headerName: "Not responded Candidates", minWidth:219,cellRendererFramework: NotificationComponent  },
      { headerName: "Job Added Date", minWidth:156,field: 'jobAddedDate' },
      { headerName: "Job Status", minWidth:197,field: 'jobStatus',tooltipField: 'jobStatus' },
    ];
    
    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
      //tooltipComponent: 'customTooltip',
    };
    this.tooltipShowDelay = 0;
    this.rowSelection = 'multiple';
    //this.frameworkComponents = { customTooltip: CustomTooltip };
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
    this.dataTransferService.clearDataSource.pipe(takeWhile(() => this.alive)).subscribe((val:any) => {
      this.gridOptions.context.gridApi?.setQuickFilter(null);
      // this.ToBeReviewedJobsService.getJobs().subscribe(data => {      
      //   console.log("DATAS", data);
      //   this.gridOptions.api?.setRowData(data);
      //   //params.api.paginationSetPageSize(10);
      //   hideLoader();    
      // });
    })

    this.dataTransferService.currentRefresh.pipe(takeWhile(() => this.alive)).subscribe((data:string) => {
      if(data == "processed"){   
      this.closedJobsService.getClosedJobs(this.userID,this.clientIDS).subscribe(data => {            
        this.gridOptions.context.gridApi?.setRowData(data);        
      });
    }
    })

  }

  ngOnDestroy(){
    this.alive = false;
    this.flag=false;
  }

  ViewDescriptionOnModel(event:any){    
    let options: NgbModalOptions = {
      size: 'lg'
    };
 this.currentCellJobDescription = event.value;
    this.modalService.open(this.content, options);
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

  OnRefresh(){
    this.closedJobsService.getClosedJobs(this.userID,this.clientIDS).subscribe(data => {      
      this.jobLists = data;
      // var params = {
      //   enableCellChangeFlash: true,
      //   suppressFlash: false,
      // };      
      this.gridApi.refreshCells()
      //this.gridApi.setRowData(data);
      //this.gridApi.refreshCells(params);
    });

    setTimeout(() => {
      if(this.flag){
         this.OnRefresh();
      }
     }, 7000);
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    showLoader();

    this.closedJobsService.getClosedJobs(this.userID, this.clientIDS).subscribe(data => {        
      this.jobLists = data;  
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

  OnPrevious(){
    this.router.navigateByUrl('/toBeReviewedJobs');
}
}
