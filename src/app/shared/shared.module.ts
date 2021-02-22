import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionLinkRendererComponent} from '../shared/frameworks/action-link-renderer/action-link-renderer.component';
import {AppliedOtherJobsComponent} from '../shared/frameworks/applied-other-jobs/applied-other-jobs.component';
import {JobDescriptionRendererComponent} from '../shared/frameworks/job-description-renderer/job-description-renderer.component';
import {TextHighlightRenderer} from './frameworks/text-highlight-renderer/text-highlight-renderer.component';
import {NotificationComponent} from '../shared/frameworks/notification/notification.component';
import {ResumeRendererComponent} from '../shared/frameworks/resume-renderer/resume-renderer.component';
import { AgGridModule } from 'ag-grid-angular';
import { PagesModule } from '../pages/pages.module';



@NgModule({
  declarations: [
    ActionLinkRendererComponent,
    AppliedOtherJobsComponent,
    JobDescriptionRendererComponent,
    TextHighlightRenderer,
    NotificationComponent,
    ResumeRendererComponent],
  imports: [
    CommonModule,
    PagesModule,
    //AgGridModule.withComponents([JobIDRendererComponent, NotificationComponent, ResumeRendererComponent,ActionLinkRendererComponent, JobDescriptionRendererComponent],),
  ],
  // exports:[
  //   ActionLinkRendererComponent,
  //   AppliedOtherJobsComponent,
  //   JobDescriptionRendererComponent,
  //   JobIDRendererComponent,
  //   NotificationComponent,
  //   ResumeRendererComponent
  // ],
  //entryComponents: [JobIDRendererComponent, NotificationComponent, JobDescriptionRendererComponent, ResumeRendererComponent, JobDescriptionRendererComponent],
})
export class SharedModule { }
