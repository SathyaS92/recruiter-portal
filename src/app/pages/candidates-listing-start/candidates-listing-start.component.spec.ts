import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesListingStartComponent } from './candidates-listing-start.component';

describe('CandidatesListingStartComponent', () => {
  let component: CandidatesListingStartComponent;
  let fixture: ComponentFixture<CandidatesListingStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesListingStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesListingStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
