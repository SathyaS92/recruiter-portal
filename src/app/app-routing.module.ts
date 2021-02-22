import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToBeReviewedJobsComponent } from "../app/pages/to-be-reviewed-jobs/to-be-reviewed-jobs.component";
import { ClosedJobsComponent } from './pages/closed-jobs/closed-jobs.component';
import { LoginComponent } from './core/login/login.component';
import { CandidateViewComponent } from './pages/candidate-view/candidate-view.component';
import { CandidatesListingStartComponent } from './pages/candidates-listing-start/candidates-listing-start.component';
import { JobDescriptionComponent } from './pages/job-description/job-description.component';
import { ProcessedJobsComponent } from './pages/processed-jobs/processed-jobs.component';

const routes: Routes = 
[{path: 'processedJobs', pathMatch: 'full', component: ProcessedJobsComponent},
{path: 'toBeReviewedJobs', pathMatch: 'full', component: ToBeReviewedJobsComponent},
{path: 'closedJobs', pathMatch: 'full', component: ClosedJobsComponent},
// {path: 'toBeReviewedJobs/candidatesListing', pathMatch: 'full', component: CandidatesListingStartComponent},
{path: 'processedJobs/candidateView/:jobDetails/:serviceName', pathMatch: 'full', component: CandidateViewComponent},
{path: 'closedJobs/candidateView/:jobDetails/:serviceName', pathMatch: 'full', component: CandidateViewComponent},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}