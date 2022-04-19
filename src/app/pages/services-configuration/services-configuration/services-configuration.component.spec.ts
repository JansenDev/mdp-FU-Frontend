import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesConfigurationComponent } from './services-configuration.component';

describe('ServicesConfigurationComponent', () => {
  let component: ServicesConfigurationComponent;
  let fixture: ComponentFixture<ServicesConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
