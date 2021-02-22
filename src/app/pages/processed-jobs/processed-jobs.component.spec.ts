import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedJobsComponent } from './processed-jobs.component';

describe('ProcessedJobsComponent', () => {
  let component: ProcessedJobsComponent;
  let fixture: ComponentFixture<ProcessedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessedJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
