import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringRequestComponent } from './hiring-request.component';

describe('HiringRequestComponent', () => {
  let component: HiringRequestComponent;
  let fixture: ComponentFixture<HiringRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
