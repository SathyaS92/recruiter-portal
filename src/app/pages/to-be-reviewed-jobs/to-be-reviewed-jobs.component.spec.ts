import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBeReviewedJobsComponent } from './to-be-reviewed-jobs.component';

describe('ToBeReviewedJobsComponent', () => {
  let component: ToBeReviewedJobsComponent;
  let fixture: ComponentFixture<ToBeReviewedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToBeReviewedJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToBeReviewedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
