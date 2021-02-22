import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedOtherJobsComponent } from './applied-other-jobs.component';

describe('AppliedOtherJobsComponent', () => {
  let component: AppliedOtherJobsComponent;
  let fixture: ComponentFixture<AppliedOtherJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedOtherJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedOtherJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
