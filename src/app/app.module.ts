import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToBeReviewedJobsComponent } from './pages/to-be-reviewed-jobs/to-be-reviewed-jobs.component';
import { ProcessedJobsComponent } from './pages/processed-jobs/processed-jobs.component';
//import { JobIDRendererComponent } from './pages/job-id-renderer/job-id-renderer.component';
//import { NotificationComponent } from './pages/notification/notification.component';
//import { ActionLinkRendererComponent } from './pages/action-link-renderer/action-link-renderer.component';
import { CandidatesListingStartComponent } from './pages/candidates-listing-start/candidates-listing-start.component';
import { JobDescriptionComponent } from './pages/job-description/job-description.component';
import { JobUpdationDirective } from './job-updation.directive';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { CandidatesSelectionComponent } from './pages/candidates-selection/candidates-selection.component';
//import { ResumeRendererComponent } from './pages/resume-renderer/resume-renderer.component';
import { CandidateViewComponent } from './pages/candidate-view/candidate-view.component';
//import { JobDescriptionRendererComponent } from './pages/job-description-renderer/job-description-renderer.component';
import { LoginModule } from './core/core.module';
import { CustomTooltip} from './pages/custom-tooltip/custom-tooltip.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
//import { AppliedOtherJobs } from './applied-other-jobs.component/applied-other-jobs.component.component';
//import { AppliedOtherJobsComponent } from '../app/pages/applied-other-jobs/applied-other-jobs.component';
import { AppliedOtherJobsDetailedComponent } from './pages/applied-other-jobs-detailed/applied-other-jobs-detailed.component';
//import { LoginComponent } from './login/login.component';
import { ClosedJobsComponent } from './pages/closed-jobs/closed-jobs.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { TextHighlightRenderer } from './shared/frameworks/text-highlight-renderer/text-highlight-renderer.component';
import { NotificationComponent } from './shared/frameworks/notification/notification.component';
import { ResumeRendererComponent } from './shared/frameworks/resume-renderer/resume-renderer.component';
import { ActionLinkRendererComponent } from './shared/frameworks/action-link-renderer/action-link-renderer.component';
import { JobDescriptionRendererComponent } from './shared/frameworks/job-description-renderer/job-description-renderer.component';
import { AuthService } from './core/login/auth.service';
import { JobsService } from './core/services/jobs.service';
import { CandidatesService } from './core/services/candidates.service';
//import { LoginComponent } from './login/login.component';
//import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,    
    //LoginComponent,
    //AuthComponent
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    AppRoutingModule,
    //HttpClientModule,  
    PagesModule,
    LoginModule,
    SharedModule,
    CommonModule,
    //AppRoutingModule,
    //NgbModule,
    //FormsModule,
    //HttpClientModule,
    //LoginModule,
    //NgbDropdown,
    //SharedModule,
    //AgGridModule,
    //AgGridModule.withComponents([JobIDRendererComponent, NotificationComponent, ResumeRendererComponent,ActionLinkRendererComponent, JobDescriptionRendererComponent],),
    //AgGridModule.withComponents([JobIDRendererComponent, NotificationComponent, ResumeRendererComponent,ActionLinkRendererComponent, JobDescriptionRendererComponent, CustomTooltip],),
    //CKEditorModule,  
  ],
  providers: [AuthService, JobsService, CandidatesService],
  entryComponents: [CandidatesListingStartComponent,TextHighlightRenderer, NotificationComponent, JobDescriptionRendererComponent, ResumeRendererComponent],
  //entryComponents: [JobIDRendererComponent, NotificationComponent, JobDescriptionComponent, ResumeRendererComponent, JobDescriptionRendererComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
