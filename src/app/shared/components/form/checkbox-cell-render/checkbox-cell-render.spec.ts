import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxCellRender } from './checkbox-cell-render';

describe('CheckboxCellRender', () => {
  let component: CheckboxCellRender;
  let fixture: ComponentFixture<CheckboxCellRender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxCellRender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxCellRender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
