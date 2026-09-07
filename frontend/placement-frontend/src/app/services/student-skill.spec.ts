import { TestBed } from '@angular/core/testing';

import { StudentSkill } from './student-skill';

describe('StudentSkill', () => {
  let service: StudentSkill;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentSkill);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
