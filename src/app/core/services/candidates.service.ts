import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateMasterModel } from '../modal/candidate-master.modal';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  private apiURL:string="";

  private http:HttpClient
  constructor(private _http: HttpClient) { 
    this.http = _http;
    this.apiURL = environment.apiUrl;
  }

    getCandidates(jobID:number):Observable<CandidateMasterModel[]>{      
      return this.http.get<CandidateMasterModel[]>(this.apiURL + "CandidatesMaster/GetCandidates?jobID="+jobID );
    }

    getDetailedCandidateList(candidateID:number):Observable<CandidateMasterModel[]>{      
      return this.http.get<CandidateMasterModel[]>(this.apiURL + "CandidatesMaster/GetDetailedCandidate?candidateID="+candidateID );
    }

    SelectCandidates(candidate_IDs:number[], jobID:number, user_Id:number){      
      return this.http.post(this.apiURL + "CandidatesMaster/SelectCandidates?jobID="+jobID +"&user_Id="+user_Id, candidate_IDs );
    }

    GetCandidateNotificationStatus(jobID:number, serviceName:string){
      return this.http.get<CandidateMasterModel[]>(this.apiURL + "CandidatesMaster/GetCandidatesNotificationStatus?jobID="+jobID+"&serviceName=" +serviceName);
    }

    GetNotifiedCounts(jobID:number, serviceName:string){
      return this.http.get<CandidateMasterModel[]>(this.apiURL + "CandidatesMaster/GetCandidatesForCounts?jobID="+jobID+"&serviceName=" +serviceName);
    }
}
