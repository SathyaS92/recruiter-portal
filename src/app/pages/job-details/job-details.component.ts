import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobDetailsComponent implements OnInit {

  public job:any;
  @Input() values:any
  public jobTitle:string="";
  public jobLocation:string="";
  public jobDetailsFormGroup:any;
  public afterNext:boolean=false;

  constructor(private formBuilder: FormBuilder) { 

  }


  @Output() passDataToParent: EventEmitter<any> = new EventEmitter<any>();
  @Output() screen:EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(){
    //console.log("jobDescription", this.values)
    //this.job = this.values;
    // this.jobTitle = this.values.jobTitle;
    // this.jobLocation = this.values.jobLocation;   

    let currentScreen = this.values.currentScreen;

    if(this.values.hasOwnProperty('currentScreen')){
      if(currentScreen == "Job Details"){
        this.afterNext = false;
      }
      else if(currentScreen != "Job Details"){
        this.afterNext = true;
      }
    }
    else{
      this.afterNext = false;
    }

    this.jobDetailsFormGroup = new FormGroup({
      jobID: new FormControl(this.values.jobID),
      jobAddedDate: new FormControl(this.values.jobAddedDate),
      customer:new FormControl(this.values.customer),
      jobDescription: new FormControl(this.values.jobDescription),
      jobTitle: new FormControl(this.values.jobTitle || '',[Validators.required, this.noWhitespaceValidator]),
      jobLocation:new FormControl(this.values.jobLocation || '',[Validators.required, this.noWhitespaceValidator]),
      currentScreen:new FormControl(this.values.currentScreen == "Candidate Selection"? "Candidate Selection":"Job Details"),
      isJobDescriptionUpdated:new FormControl(false)
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

  onJobTitleChange(event:any){    
    this.jobTitle = event;
  }

  onJobLocationChange(event:any){
   this.jobLocation = event; 
  }

  OnNext(){    
      //console.log("JOBFORMGROUP", this.jobFormGroup)
      //this.values.jobTitle = this.jobTitle;
      //this.values.jobLocation = this.jobLocation;  
      if(this.values.isJobDescriptionUpdated == true){
        this.jobDetailsFormGroup.get('isJobDescriptionUpdated').patchValue(true);
      } 
      this.passDataToParent.emit( this.jobDetailsFormGroup.value);
      this.screen.emit("Job Description");
  }
  
  }
