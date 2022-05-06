import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePeriodComponent } from './update-period.component';

describe('UpdatePeriodComponent', () => {
  let component: UpdatePeriodComponent;
  let fixture: ComponentFixture<UpdatePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
