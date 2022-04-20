import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractImboxComponent } from './contract-imbox.component';

describe('ContractImboxComponent', () => {
  let component: ContractImboxComponent;
  let fixture: ComponentFixture<ContractImboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractImboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractImboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
