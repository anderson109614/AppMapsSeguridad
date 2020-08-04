import { TestBed } from '@angular/core/testing';

import { BaseLocalService } from './base-local.service';

describe('BaseLocalService', () => {
  let service: BaseLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
