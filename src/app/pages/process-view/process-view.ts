import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

interface Retiro {
  id: string;
  fechaSolicitud: string;
  cuentaOrigen: {
    tipo: string;
    numero: string;
  };
  monto: number;
  estado: string;
}

@Component({
  selector: 'app-process-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    DialogModule,
    TextareaModule,
    ToastModule
  ],
  templateUrl: './process-view.html',
  styleUrl: './process-view.scss',
  providers: [MessageService]
})
export class ProcessView implements OnInit {
  @ViewChild('dt') dt!: Table;

  retiros: Retiro[] = [];
  
  approvalDialogVisible: boolean = false;
  selectedRetiro: Retiro | null = null;
  approvalComment: string = '';
  
  totalRecords: number = 0;
  loading: boolean = false;

  private retirosData: Retiro[] = [];

  constructor(private messageService: MessageService) {}

  // Datos de ejemplo para los flujos de retiro
  private readonly retirosDataExample: Retiro[] = [
    { id: 'RT-001', fechaSolicitud: '2023-10-20', cuentaOrigen: { tipo: 'Ahorros', numero: '123-456-789' }, monto: 50000, estado: 'Aprobado' },
    { id: 'RT-002', fechaSolicitud: '2023-10-21', cuentaOrigen: { tipo: 'Corriente', numero: '987-654-321' }, monto: 120000, estado: 'Pendiente' },
    { id: 'RT-003', fechaSolicitud: '2023-10-21', cuentaOrigen: { tipo: 'Ahorros', numero: '111-222-333' }, monto: 75000, estado: 'En Revisión' },
    { id: 'RT-004', fechaSolicitud: '2023-10-22', cuentaOrigen: { tipo: 'Ahorros', numero: '123-456-789' }, monto: 25000, estado: 'Aprobado' },
    { id: 'RT-005', fechaSolicitud: '2023-10-23', cuentaOrigen: { tipo: 'Corriente', numero: '555-444-333' }, monto: 300000, estado: 'Rechazado' },
    { id: 'RT-006', fechaSolicitud: '2023-10-24', cuentaOrigen: { tipo: 'Ahorros', numero: '987-654-321' }, monto: 95000, estado: 'Aprobado' },
  ];

  ngOnInit() {
    // Inicializamos los datos para la simulación del backend
    this.retirosData = [...this.retirosDataExample];
  }

  loadRetiros(event: TableLazyLoadEvent) {
    this.loading = true;

    // Simulación de llamada a un servicio backend
    setTimeout(() => {
      let filteredData = [...this.retirosData];

      const globalFilter = event.globalFilter;
      // Simulación de filtro global
      if (typeof globalFilter === 'string') {
        filteredData = filteredData.filter(retiro => 
          Object.values(retiro).some(value => 
            String(value).toLowerCase().includes(globalFilter.toLowerCase()) ||
            (typeof value === 'object' && value !== null && Object.values(value).some(subValue => 
              String(subValue).toLowerCase().includes(globalFilter.toLowerCase())
            ))
          )
        );
      }

      // Simulación de ordenamiento
      if (typeof event.sortField === 'string' && event.sortOrder) {
        filteredData.sort((a, b) => {
          const field = event.sortField as keyof Retiro;
          const valueA = a[field];
          const valueB = b[field];
          let result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
          return result * event.sortOrder!;
        });
      }

      this.totalRecords = filteredData.length;
      const first = event.first ?? 0;
      const rows = event.rows ?? 10;
      this.retiros = filteredData.slice(first, first + rows);
      this.loading = false;

    }, 1000); // Simular latencia de red de 1 segundo
  }

  getSeverity(status: string) {
    switch (status) {
        case 'Aprobado':
            return 'success';
        case 'Pendiente':
        case 'En Revisión':
            return 'warn';
        case 'Rechazado':
            return 'danger';
        default:
            return 'info';
    }
  }

  openApprovalDialog(retiro: Retiro) {
    this.selectedRetiro = retiro;
    this.approvalComment = '';
    this.approvalDialogVisible = true;
  }

  hideDialog() {
    this.approvalDialogVisible = false;
    this.selectedRetiro = null;
    this.approvalComment = '';
  }

  approveRetiro() {
    if (this.selectedRetiro) {
      this.selectedRetiro.estado = 'Aprobado';
      // Aquí iría la lógica para llamar al servicio real
      console.log(`Retiro ${this.selectedRetiro.id} aprobado con comentario: "${this.approvalComment}"`);
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El retiro ha sido aprobado.' });
      this.hideDialog();
    }
  }

  rejectRetiro() {
    if (this.selectedRetiro) {
      if (!this.approvalComment.trim()) {
        this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El comentario es obligatorio para rechazar.' });
        return;
      }
      this.selectedRetiro.estado = 'Rechazado';
      // Aquí iría la lógica para llamar al servicio real
      console.log(`Retiro ${this.selectedRetiro.id} rechazado con comentario: "${this.approvalComment}"`);
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'El retiro ha sido rechazado.' });
      this.hideDialog();
    }
  }

}
