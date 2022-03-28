import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceMapDetailComponent } from './resource-map-detail.component';

describe('ResourceMapDetailComponent', () => {
  let component: ResourceMapDetailComponent;
  let fixture: ComponentFixture<ResourceMapDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceMapDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceMapDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
