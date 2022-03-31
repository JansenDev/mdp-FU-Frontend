import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceMapComponent } from './resource-map.component';

describe('ResourceMapComponent', () => {
  let component: ResourceMapComponent;
  let fixture: ComponentFixture<ResourceMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
