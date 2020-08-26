import { TestBed } from '@angular/core/testing';

import { MyAgendaService } from './my-agenda.service';

describe('MyAgendaService', () => {
  let service: MyAgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAgendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
