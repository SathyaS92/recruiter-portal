import { TestBed } from '@angular/core/testing';

import { JobsService } from '../../core/services/jobs.service';

describe('ToBeReviewedJobsService', () => {
  let service: JobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
