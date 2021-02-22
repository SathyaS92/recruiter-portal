import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JobMasterModel } from './core/modal/job-master.model';
import { JobsService } from './core/services/jobs.service';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private searchSource = new BehaviorSubject("");
  currentSearchValue = this.searchSource.asObservable();

  private dateSource = new BehaviorSubject("");
  currentDateValue = this.dateSource.asObservable();  

  private clearSource = new BehaviorSubject("");
  clearDataSource = this.clearSource.asObservable();

  private candidateViewTitle = new BehaviorSubject("");
  candidateViewDataSource = this.candidateViewTitle.asObservable();

  private onRefresh = new BehaviorSubject("");
  currentRefresh = this.onRefresh.asObservable();

  private userName = new BehaviorSubject("");
  currentUserName = this.userName.asObservable();

  constructor(private toBeReviewedJobservice:JobsService) { }

  searchField(searchValue: string) {
    //console.log(searchValue);    
    this.searchSource.next(searchValue)
  }

  datePickerField(dateValue: string) {    
    this.dateSource.next(dateValue)
  }

  clearData(){    
      this.clearSource.next("");
  }

  candidateTitleUpdate(title:string){
    this.candidateViewTitle.next(title);
  }

  refresh(refreshValue:string){
    this.onRefresh.next(refreshValue);
  }

  updateUserName(userName:string){
    this.userName.next(userName);
  }

  // selectedDateValue(message: string) {
  //   this.messageSource.next(message)
  // }

}
