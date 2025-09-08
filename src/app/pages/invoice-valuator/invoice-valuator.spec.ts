import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceValuator } from './invoice-valuator';

describe('InvoiceValuator', () => {
  let component: InvoiceValuator;
  let fixture: ComponentFixture<InvoiceValuator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceValuator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceValuator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
