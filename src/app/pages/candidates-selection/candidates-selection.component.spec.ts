import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesSelectionComponent } from './candidates-selection.component';

describe('CandidatesSelectionComponent', () => {
  let component: CandidatesSelectionComponent;
  let fixture: ComponentFixture<CandidatesSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
