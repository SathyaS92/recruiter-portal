import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AppliedOtherJobsComponent } from '../../shared/frameworks/applied-other-jobs/applied-other-jobs.component';
import { CandidatesService } from '../../core/services/candidates.service';
import { TextHighlightRenderer } from '../../shared/frameworks/text-highlight-renderer/text-highlight-renderer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare const showLoader:any;
declare const hideLoader:any;

@Component({
  selector: 'app-applied-other-jobs-detailed',
  templateUrl: './applied-other-jobs-detailed.component.html',
  styleUrls: ['./applied-other-jobs-detailed.component.scss']
})
export class AppliedOtherJobsDetailedComponent implements OnInit {

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
  public noRowsTemplate:string="";
  public candidatesService:any;
  public candidatesList:any;

  @Input() candidateID:number=0;

  constructor(private _candidatesService: CandidatesService, public modalService:NgbModal,private elRef:ElementRef) {

    this.candidatesService = _candidatesService;

    this.noRowsTemplate = "<span></span>";

    this.columnDefs = [
      {
        headerName: 'Job ID',
        field: 'jobID',
        //maxWidth: 90,
        maxWidth:170,
        // headerCheckboxSelection: true,
        // checkboxSelection: true,
        cellRendererFramework: TextHighlightRenderer      
      },
      {
        headerName: 'Job Title',
        field: 'title',
        //maxWidth: 90,
      },
      {
        headerName: 'Recruiter Email',
        field: 'email',
        //maxWidth: 90,
      },
      { headerName: "Client",field: 'companyName', tooltipField: 'companyName'},
      // {
      //   headerName: 'Name',
      //   field: 'athlete',
      //   minWidth: 170,
      //   checkboxSelection: checkboxSelection,
      //   headerCheckboxSelection: headerCheckboxSelection,
      // },
  
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

  ngOnInit(): void {
  }

  onGridReady(params:any) {
    //console.log("JOB", this.jobTitle);  
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.elRef.nativeElement.querySelector('#loadingCandidateDetailed').style.display="block";  
    //showLoader();
    this.candidatesService.getDetailedCandidateList(this.candidateID).subscribe((data:any) => {     
      // for(let i)
      // let test = data.job_details.split("|")
      // console.log('T',test)
      this.candidatesList = data;
      //hideLoader();    
      this.elRef.nativeElement.querySelector('#loadingCandidateDetailed').style.display="none";  
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
