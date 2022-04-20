import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImboxFilterComponent } from './imbox-filter.component';

describe('ImboxFilterComponent', () => {
  let component: ImboxFilterComponent;
  let fixture: ComponentFixture<ImboxFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImboxFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImboxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
