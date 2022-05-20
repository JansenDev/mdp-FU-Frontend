import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRenovationRequestComponent } from './contract-renovation-request.component';

describe('ContractRenovationRequestComponent', () => {
  let component: ContractRenovationRequestComponent;
  let fixture: ComponentFixture<ContractRenovationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractRenovationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractRenovationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
