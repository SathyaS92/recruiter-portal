import { componentFactoryName } from '@angular/compiler';
import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { JobUpdationDirective } from 'src/app/job-updation.directive';
import { CandidatesSelectionComponent } from '../candidates-selection/candidates-selection.component';
import { JobDescriptionComponent } from '../job-description/job-description.component';
import { JobDetailsComponent } from '../job-details/job-details.component';

@Component({
  selector: 'app-candidates-listing-start',
  templateUrl: './candidates-listing-start.component.html',
  styleUrls: ['./candidates-listing-start.component.scss']
})
export class CandidatesListingStartComponent implements OnInit {

  _component: any;
  componentsList:any[] = [];
  componentRef:any;
  subscription:any;
  inputParams:any;

  //@ViewChild('dynamicComponent', { read: ViewContainerRef }) myRef: any;
  @ViewChild(JobUpdationDirective) appJobUpdation!: JobUpdationDirective;

  @Input() parameters:any;
  @Input() screens:any;
  public values:any;
  public selectedScreen:string="";
  observeVariable: Subject<any> = new Subject();
  //@Input() afterJobDetails:any;

  //afterJobDetails: EventEmitter<any> = new EventEmitter();

  constructor(private viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver,) { 
    
  }

  ngOnInit(){
    this.inputParams = this.parameters
  }

  ngAfterViewInit(): void {

    this.loadComponent("Job Details");
    // console.log("SCREENS", this.screens);
    // console.log("JOBDETAILS", this.afterJobDetails)

  }

  loadComponent(selectedScreen: string) {
    
    //console.log("PARAMETERS", this.parameters);
    // remove loaded Component
    // if (!isNullOrUndefined(this.componentsList)) {
    //   this.componentsList.map((cm, i) => {
    //     let tmp = this.viewContainerRef;
    //     this.viewContainerRef.remove(this.viewContainerRef.indexOf(cm));
    //     this.viewContainerRef.remove(i);
    //     this.componentsList.splice(i, 1);
    //   });
    // }

    this._component = "";
    if (selectedScreen == "Job Details")
      this._component = JobDetailsComponent;
      if (selectedScreen == "Job Description")
      this._component = JobDescriptionComponent;
      if(selectedScreen == "Candidates Selection")
      this._component = CandidatesSelectionComponent
      
    this.viewContainerRef.detach();
    this.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this._component);
    this.viewContainerRef = this.appJobUpdation.viewContainerRef;

    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.values = this.inputParams;
    if(((<any>this.componentRef.instance).passDataToParent)){
      (<any>this.componentRef.instance).passDataToParent.subscribe((val: any) => {this.inputParams = val;        
        this.loadComponent("Job Details");
        //this.loadTabComponent(_selectedTab)
        });
        if(((<any>this.componentRef.instance).screen)){
          (<any>this.componentRef.instance).screen.subscribe((val: any) => {this.selectedScreen = val;            
            this.loadComponent(this.selectedScreen);
            //this.loadTabComponent(_selectedTab)
            });
      }
    }    
  // }
    //console.log("COMPONENT REF", componentRef);

    //this.componentsList.push(componentRef);
  }

}
