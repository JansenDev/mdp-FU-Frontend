import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodAdministrationComponent } from './period-administration.component';

describe('PeriodAdministrationComponent', () => {
  let component: PeriodAdministrationComponent;
  let fixture: ComponentFixture<PeriodAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
