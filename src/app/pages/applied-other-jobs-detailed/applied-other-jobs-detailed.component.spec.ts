import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedOtherJobsDetailedComponent } from './applied-other-jobs-detailed.component';

describe('AppliedOtherJobsDetailedComponent', () => {
  let component: AppliedOtherJobsDetailedComponent;
  let fixture: ComponentFixture<AppliedOtherJobsDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedOtherJobsDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedOtherJobsDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
