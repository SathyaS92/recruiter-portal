import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[job-updation]'
})
export class JobUpdationDirective {

  constructor(public viewContainerRef: ViewContainerRef) {    
  }

}
