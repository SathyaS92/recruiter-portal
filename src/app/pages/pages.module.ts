import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ToBeReviewedJobsComponent } from './to-be-reviewed-jobs/to-be-reviewed-jobs.component';
import { ProcessedJobsComponent } from './processed-jobs/processed-jobs.component';
import { CandidatesListingStartComponent } from './candidates-listing-start/candidates-listing-start.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { JobUpdationDirective } from '../job-updation.directive';
import { JobDetailsComponent } from './job-details/job-details.component';
import { CandidatesSelectionComponent } from './candidates-selection/candidates-selection.component';
import { CandidateViewComponent } from './candidate-view/candidate-view.component';
import { CustomTooltip } from './custom-tooltip/custom-tooltip.component';
import { AppliedOtherJobsDetailedComponent } from './applied-other-jobs-detailed/applied-other-jobs-detailed.component';
import { ClosedJobsComponent } from './closed-jobs/closed-jobs.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [    
    ToBeReviewedJobsComponent,
    ProcessedJobsComponent,
    //JobIDRendererComponent,
    //NotificationComponent,
    //ActionLinkRendererComponent,
    CandidatesListingStartComponent,
    JobDescriptionComponent,
    JobUpdationDirective,
    JobDetailsComponent,
    CandidatesSelectionComponent,
    //ResumeRendererComponent,
    CandidateViewComponent,
    //JobDescriptionRendererComponent,
    CustomTooltip,
    //AppliedOtherJobsComponent,
    AppliedOtherJobsDetailedComponent,
    ClosedJobsComponent],
  imports: [
    CommonModule,
    // AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //LoginModule,
    //NgbDropdown,
    //SharedModule,
    AgGridModule,
    //AgGridModule.withComponents([JobIDRendererComponent, NotificationComponent, ResumeRendererComponent,ActionLinkRendererComponent, JobDescriptionRendererComponent, CustomTooltip],),
    CKEditorModule,  
  ],
  exports:[
    AgGridModule,
    //CKEditorModule,  
    NgbModule,
    FormsModule,
    HttpClientModule,
    //ToBeReviewedJobsComponent,
    //ProcessedJobsComponent,
    //JobIDRendererComponent,
    //NotificationComponent,
    //ActionLinkRendererComponent,
    CandidatesListingStartComponent,
    //JobDescriptionComponent,
    //JobUpdationDirective,
    //JobDetailsComponent,
    //CandidatesSelectionComponent,
    //ResumeRendererComponent,
    //CandidateViewComponent,
    //JobDescriptionRendererComponent,
    //CustomTooltip,
    //AppliedOtherJobsComponent,
    AppliedOtherJobsDetailedComponent,
    //ClosedJobsComponent
  ]
})
export class PagesModule { }
