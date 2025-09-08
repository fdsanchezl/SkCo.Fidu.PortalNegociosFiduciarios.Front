import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxHeader } from './checkbox-header';

describe('CheckboxHeader', () => {
  let component: CheckboxHeader;
  let fixture: ComponentFixture<CheckboxHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
