import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTeamComponent } from './assigned-team.component';

describe('AssignedTeamComponent', () => {
  let component: AssignedTeamComponent;
  let fixture: ComponentFixture<AssignedTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
