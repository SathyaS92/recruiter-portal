import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JobMasterModel} from '../modal/job-master.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiURL:string="";

  private http:HttpClient
  constructor(private _http: HttpClient) { 
    this.http = _http;
    this.apiURL = environment.apiUrl;
  }

    getJobs(userId:number, clientCorporationIDs:string):Observable<JobMasterModel[]>{            
      return this.http.get<JobMasterModel[]>(this.apiURL+"JobMaster/GetJobsList?userId="+userId+"&clientIDs="+clientCorporationIDs);
    }

    getProcessedJobs(userId:number, clientCorporationIDs:string):Observable<JobMasterModel[]>{      
      return this.http.get<JobMasterModel[]>(this.apiURL+ "JobMaster/GetProcessedJobs?userId="+userId+"&clientIDs="+clientCorporationIDs);
    }

    getClosedJobs(userId:number, clientCorporationIDs:string):Observable<JobMasterModel[]>{      
      return this.http.get<JobMasterModel[]>(this.apiURL+ "JobMaster/GetClosedJobs?userId="+userId+"&clientIDs="+clientCorporationIDs);
    }

    updateJobTitleLocation(jobDetails:JobMasterModel){         
      return this.http.post(this.apiURL+ "JobMaster/UpdateJobTitleLocation", jobDetails);
    }
}
