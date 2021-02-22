import { TestBed } from '@angular/core/testing';

import { CandidatesService } from './core/services/candidates.service';

describe('CandidateService', () => {
  let service: CandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
