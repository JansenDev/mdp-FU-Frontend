import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveHiringRequestComponent } from './approve-hiring-request.component';

describe('ApproveHiringRequestComponent', () => {
  let component: ApproveHiringRequestComponent;
  let fixture: ComponentFixture<ApproveHiringRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveHiringRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveHiringRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
