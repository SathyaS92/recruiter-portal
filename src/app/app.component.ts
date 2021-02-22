import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DataTransferService } from './data-transfer.service';
import { DatePipe } from '@angular/common';
import { Compiler } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { AuthService } from './core/login/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public gridApi:any;
  // public gridColumnApi:any;
    public model:any = null;
    public clearIcon:boolean = false;    
  // public columnDefs:any;
  // public autoGroupColumnDef:any;
  // public defaultColDef:any;
  // public rowSelection;
  // public rowGroupPanelShow;
  // public pivotPanelShow;
  // public paginationPageSize;
  // public paginationNumberFormatter:any;
  // public rowData:any;
  public searchBox:any;
  public classActive:string = "";
  public showHead:boolean=false;
  public processedJobsURL: string = "";
  public toBeReviewedURL: string = "";
  private currentTab:string="ToBeReviewedJobs";
  public userName:any;
  public showCalendar:boolean=true;
  public title:string="";
  private UserList:any;
  public candidateView=false;
  public currentURL:string="";

  constructor(private router: Router, private authService:AuthService, private renderer2:Renderer2,private elRef:ElementRef,private dataTransferService:DataTransferService,private _compiler: Compiler) {

    // this.processedJobsURL = this.router.url;
    // this.toBeReviewedURL = this.router.url;
  
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {        
        if (event['url'] == '/login' || event['url'] == '/' && !event['url'].includes("candidateView")) {
          this.showHead = false;
          this.showCalendar = true;
          this.searchBox = null;    
          this.currentURL = event['url'];              
        }     
        else if(event['url'].includes("/processedJobs/candidateView")){
          this.showCalendar = false;
          this.showHead = true;
          this.searchBox = null;
          this.candidateView = true;
          this.classActive="Processed";
          this.currentURL = event['url'];   
          dataTransferService.candidateViewDataSource.subscribe((data:any)=>{
            this.title=data
         });
      } 
        else if(event['url'].includes("/closedJobs/candidateView")){
            this.showCalendar = false;
            this.showHead = true;
            this.searchBox = null;
            this.candidateView = true;
            this.classActive="Closed";
            this.currentURL = event['url'];   
            dataTransferService.candidateViewDataSource.subscribe((data:any)=>{
              this.title=data
           });
        }
        else if(event['url'] == "/toBeReviewedJobs"){
          this.showHead = true;
          this.classActive="Review";
          this.showCalendar = true;
          this.candidateView = false;
          this.searchBox = null;
          this.currentURL = "";
          this.title = "";
        }
        else if(event['url'] == "/processedJobs"){
          // console.log("NU")
          this.showHead = true;
          this.classActive="Processed";
          this.showCalendar = true;
          this.candidateView = false;
          this.searchBox = null;
          this.currentURL = "";
          this.title = "";
        }
        else if(event['url'] == "/closedJobs"){
          // console.log("NU")
          this.showHead = true;
          this.classActive="Closed";
          this.showCalendar = true;
          this.candidateView = false;
          this.searchBox = null;
          this.currentURL = "";
          this.title = "";
        }  
      }
    });




    // this.columnDefs = [
    //   {
    //     headerName: 'Name',
    //     field: 'athlete',
    //     minWidth: 170,
    //     checkboxSelection: checkboxSelection,
    //     headerCheckboxSelection: headerCheckboxSelection,
    //   },
    //   { field: 'age' },
    //   { field: 'country' },
    //   { field: 'year' },
    //   { field: 'date' },
    //   { headerName: 'Skill', field: 'sport' },
    //   { field: 'gold' },
    //   { field: 'silver' },
    //   { field: 'bronze' },
    //   { field: 'total' },
    // ];
    // this.autoGroupColumnDef = {
    //   headerName: 'Group',
    //   minWidth: 170,
    //   field: 'athlete',
    //   valueGetter: function (params:any) {
    //     if (params.node.group) {
    //       return params.node.key;
    //     } else {
    //       return params.data[params.colDef.field];
    //     }
    //   },
    //   headerCheckboxSelection: true,
    //   cellRenderer: 'agGroupCellRenderer',
    //   cellRendererParams: { checkbox: true },
    // };
    // this.defaultColDef = {
    //   editable: true,
    //   enableRowGroup: true,
    //   enablePivot: true,
    //   enableValue: true,
    //   sortable: true,
    //   resizable: true,
    //   filter: true,
    //   flex: 1,
    //   minWidth: 100,
    // };
    // this.rowSelection = 'multiple';
    // this.rowGroupPanelShow = 'always';
    // this.pivotPanelShow = 'always';
    // this.paginationPageSize = 10;
    // this.paginationNumberFormatter = function (params:any) {
    //   return '[' + params.value.toLocaleString() + ']';
    // };
  }

  public onReview(){

  }

   public onProcessed(){
    // let inProgressButton = this.elRef.nativeElement.querySelector('.inProgressButton'); 
    // let activeTag = this.elRef.nativeElement.querySelector('.newJobsButton'); 
    // let closedButton = this.elRef.nativeElement.querySelector('.closedButton'); 

    // inProgressButton.classList.add("activeClass");
    // activeTag.classList.add("inactiveClass")
    // closedButton.classList.remove("inactiveClass")
   }

   public onClosed(){

   }

   ngAfterViewInit(){    
    let UserList =  JSON.parse(localStorage.getItem("UserName") || '{}');    
    //if(UserList.first_name != this.userName){
      //location.reload();
    //}
    //else{
    this.userName = UserList.first_name;
    //}

    this.dataTransferService.currentUserName.subscribe((data:any) => { 
      this.userName = data
      //this.searchData = data;
      //this.SearchData();
      //this.gridApi.setQuickFilter(data); 
    })




  }

   public SignOut(){

    this.router.navigateByUrl('/login');

    //let UserList =  JSON.parse(localStorage.getItem("UserName") || '{}'); 
     //this.userName = null;     
     //window.location.href="https://recruiter-portal-dev.azurewebsites.net/#/login"
    //  this.authService.SignOut(UserList.first_name).subscribe(data=>{
    //    if(data == "success"){
    //     localStorage.removeItem("UserName");
    //     localStorage.clear();
    //     this.router.navigateByUrl('/login');
    //    }
    //    else{
   
    //     Swal.fire("Hello "+ UserList.first_name+",", 'An error occured during your sign out, Kindly check with your IT administrator', 'info');
    //    }
    //  })
   }


   public OnSearch(){
    this.dataTransferService.searchField(this.searchBox)
   }

   public clearData(){     
    this.clearIcon = false;

        this.dataTransferService.clearData();
        // switch(this.currentTab){
        //   case "ToBeReviewedJobs":
        //     this.dataTransferService.clearDataToBeReviewedJobs();
        // }
        
   }

   OnRefresh(){    
    let event = this.router.url; 
    if(event == "/toBeReviewedJobs"){
    this.dataTransferService.refresh("toBeReviewed");
    }else if(event == "/processedJobs"){
      this.dataTransferService.refresh("processed");
    }
   }

   onDatePickerChange(){
     if(this.model != null){
       this.clearIcon = true;
      var inputValue = (<HTMLInputElement>document.getElementById('date-picker')).value;

      let date= new DatePipe('en-US');

      let dateParts = date.transform(inputValue, 'dd/MM/YYYY');
      //console.log("dateParts Value", dateParts);
      if(dateParts != null){
      this.dataTransferService.datePickerField(dateParts);
      }
      }
     //console.log("Model Value", this.model);
   }



//   onPageSizeChanged() {
//     // var value = document.getElementById('page-size').value();
//     var inputValue = (<HTMLInputElement>document.getElementById('page-size')).value;
//     this.gridApi.paginationSetPageSize(Number(inputValue));
//   }

//    onFilterTextBoxChanged() {
//     let val = (<HTMLInputElement>document.getElementById('search-box')).value
//     this.gridApi.setQuickFilter(val);
// }

 ///onDatePickerChange() {
   
 ///var inputValue = (<HTMLInputElement>document.getElementById('date-picker')).value;

 ///let date= new DatePipe('en-US');

///const dateParts = date.transform(inputValue, 'dd/MM/YYYY');
///this.gridApi.setQuickFilter(dateParts);

//  console.log("DP", this.gridApi);
//   //  let str = inputValue.replace('-','/').replace('-','/');
//   //  console.log("MyElement", str);
//   //  str
//   //  let str2 = str.match(/.{1,4}{1,4}/g);
//   //  console.log("String2",str2);
//   //  let str3 = str2.reverse();
//   //  let str4 = str3.join("");
//   //  this.gridApi.setQuickFilter(str4);
//   //  console.log("GridAPI", str4);
// }

// OnDatePickerClear(){
//   this.gridApi.setQuickFilter(null);

//   this.http
//   .get(
//     'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
//   )
//   .subscribe((data) => {
//     console.log("ROWDATA", data)
//     this.rowData = data;
//     this.gridApi.setRowData(data);
//   });
// }

// OnSubmit(){
//   let selectedNodes = this.gridApi.getSelectedNodes();
//   console.log("SelectedNodes", selectedNodes);
// }

//   SweetAlert(){

//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will not be able to recover this imaginary file!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, keep it'
//     }).then((result) => {
//       if (result.value) {
//         Swal.fire(
//           'Deleted!',
//           'Your imaginary file has been deleted.',
//           'success'
//         )} 
//         else if (result.dismiss === Swal.DismissReason.cancel) {
//         Swal.fire(
//           'Cancelled',
//           'Your imaginary file is safe :)',
//           'error'
//         )
//   showLoader();

//     setTimeout(()=>{                           //<<<---using ()=> syntax
//       hideLoader();
//  }, 3000);
//       }
//     })  



//   }

//   onGridReady(params:any) {
//     this.gridApi = params.api;
//     this.gridColumnApi = params.columnApi;

//     this.http
//       .get(
//         'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
//       )
//       .subscribe((data) => {
//         console.log("ROWDATA", data)
//         this.rowData = data;
//         params.api.paginationGoToPage(4);
//       });
//   }
}

var checkboxSelection = function (params:any) {
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (params:any) {
  return params.columnApi.getRowGroupColumns().length === 0;
};
