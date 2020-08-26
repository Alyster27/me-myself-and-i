import { TestBed } from '@angular/core/testing';

import { MyContactsService } from './my-contacts.service';

describe('MyContactsService', () => {
  let service: MyContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
