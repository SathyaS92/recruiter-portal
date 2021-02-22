import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionRendererComponent } from './job-description-renderer.component';

describe('JobDescriptionRendererComponent', () => {
  let component: JobDescriptionRendererComponent;
  let fixture: ComponentFixture<JobDescriptionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDescriptionRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
