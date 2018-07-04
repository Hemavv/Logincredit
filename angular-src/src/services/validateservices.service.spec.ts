/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidateservicesService } from './validateservices.service';

describe('ValidateservicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidateservicesService]
    });
  });

  it('should ...', inject([ValidateservicesService], (service: ValidateservicesService) => {
    expect(service).toBeTruthy();
  }));
});
