import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeRendererComponent } from './resume-renderer.component';

describe('ResumeRendererComponent', () => {
  let component: ResumeRendererComponent;
  let fixture: ComponentFixture<ResumeRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
