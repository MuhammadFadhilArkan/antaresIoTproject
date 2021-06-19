import { TestBed } from '@angular/core/testing';

import { AntaresService } from './antares.service';

describe('AntaresService', () => {
  let service: AntaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
