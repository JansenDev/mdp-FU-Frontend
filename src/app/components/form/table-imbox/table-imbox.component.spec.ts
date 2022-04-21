import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableImboxComponent } from './table-imbox.component';

describe('TableImboxComponent', () => {
  let component: TableImboxComponent;
  let fixture: ComponentFixture<TableImboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableImboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableImboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
