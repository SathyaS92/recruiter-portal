import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { CandidatesService } from '../../../core/services/candidates.service';
//import {Router} from ' @angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements ICellRendererAngularComp {

  public params: any;
  public headerValue:string="";
  public notifiedCandidates:number=0;
  public ytbNotifiedCandidates:number=0;
  public interestedCandidates:number=0;
  public notRespondedCandidates:number=0;
  public router:any;
  public candidatesService:any;
  private url:string="";

  agInit(params: any): void {
    //this.notifyCount = params.value;  
    this.params = params;       
    this.headerValue = params.colDef.headerName;
    //console.log("PARAMETERS", this.params);

    //this.GetCandidatesForCounts(this.params.data.jobID, params.colDef.headerName);
      
  }

  constructor(private _router:Router, private _candidateService: CandidatesService,) {
    this.router = _router;
    this.candidatesService = _candidateService;
    this.url = this.router.url;   
  }

  refresh(): boolean {
    return false;
  }

  GetCandidatesForCounts(jobID:number, serviceName:string){
    this.candidatesService.GetNotifiedCounts(jobID, serviceName).subscribe((data:any) => {      
      // console.log("NOTIFIED CANDIDATES", this.notifiedCandidates);
      this.notifiedCandidates = data;
      //hideLoader();    
    });
  }

  NotifiedCandidates(parameters:any){    
  
    if(this.url == "/closedJobs"){
    this.router.navigate(['closedJobs/','candidateView', JSON.stringify(parameters.data) , "Notified Candidates"]);
    }
    else if(this.url == "/processedJobs"){
      this.router.navigate(['processedJobs/','candidateView', JSON.stringify(parameters.data) , "Notified Candidates"]);
      }
  }

  YtoBNotifiedCandidates(parameters:any){

    if(this.url == "/closedJobs"){
      this.router.navigate(['closedJobs/','candidateView', JSON.stringify(parameters.data) , "Yet To Be Notified Candidates"]);
      }
      else if(this.url == "/processedJobs"){
        this.router.navigate(['processedJobs/','candidateView', JSON.stringify(parameters.data) , "Yet To Be Notified Candidates"]);
        }
  }

  InterestedCandidates(parameters:any){   
    if(this.url == "/closedJobs"){
      this.router.navigate(['closedJobs/','candidateView', JSON.stringify(parameters.data) , "Interested Candidates"]);
      }
      else if(this.url == "/processedJobs"){
        this.router.navigate(['processedJobs/','candidateView', JSON.stringify(parameters.data) , "Interested Candidates"]);
        } 
  }

  NtRespondedCandidates(parameters:any){    

    if(this.url == "/closedJobs"){
      this.router.navigate(['closedJobs/','candidateView', JSON.stringify(parameters.data) , "Not Responded Candidates"]);
      }
      else if(this.url == "/processedJobs"){
        this.router.navigate(['processedJobs/','candidateView', JSON.stringify(parameters.data) , "Not Responded Candidates"]);
    } 
  }

}
