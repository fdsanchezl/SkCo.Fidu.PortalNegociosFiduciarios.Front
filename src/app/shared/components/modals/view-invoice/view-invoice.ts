import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DetailInvoiceModal } from '@core/interfaces/modals.interface';

@Component({
  selector: 'app-view-invoice',
  imports: [],
  templateUrl: './view-invoice.html',
  styleUrl: './view-invoice.scss'
})
export class ViewInvoice {

  @Input() openModal=false

  @Input() title ='ID Titulo 233'
  @Input() detailInvoice: DetailInvoiceModal[]=[
    {
      label:'ID Emisor',
      value: 9011233456
    },
    {
      label:'Emisor',
      value: 'Empresa Emisora SAS'
    },
    {
      label:'ID Deudor',
      value: 800229735
    },
    {
      label:'Fecha de pago',
      value: '20/04/2025'
    },
    {
      label:'Tipo de operación',
      value: 'FACTORING PRONTO PAGO'
    },
    {
      label:'Tipo de factoring',
      value: 'CON RESPONSABILIDAD'
    },
    {
      label:'CUFE',
      value: 'Código CUFE'
    },
    {
      label:'Fecha de pago',
      value: '2024-05-15 | 09:00 a.m.'
    },
    {
      label:'No. Factura',
      value: 'TEST01'
    },
    {
      label:'Valor facial Radian',
      value: 0
    },
    {
      label:'Tipo factoring',
      value: '$2.871.233,64'
    },
    {
      label:'Estado del pago',
      value: 'pagado'
    }
  ]

  @Output() closeModalEmit = new EventEmitter<boolean>();


  closeModal(event: boolean){
    this.closeModalEmit.emit(event)
  }


}
