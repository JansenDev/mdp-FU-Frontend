import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingServicesComponent } from './billing-services.component';

describe('BillingServicesComponent', () => {
  let component: BillingServicesComponent;
  let fixture: ComponentFixture<BillingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
