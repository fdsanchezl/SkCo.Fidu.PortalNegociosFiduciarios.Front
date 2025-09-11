import { Component, OnInit } from '@angular/core';
import { actions } from '@core/interfaces/table.interface';
import { ColumnInvoicesOffered, ActionsInvoicesOffered, ColumnInvoicesCurrent, ColumnInvoicesSettled, ColumnInvoicesOfferedAG } from './constants/table.const';
import { keysInvoiceValuator, tabsInvoiceValuator } from './constants/invoice-valuator.const'
import { Tabs } from '@core/interfaces/invoice-valuator.interface';
import { Chart } from '@shared/components/chart/chart';
import { ViewInvoice } from '@shared/components/modals/view-invoice/view-invoice';
import { invoicesMock } from '@shared/mocks/facturas';
import { ColDef, GridApi, GridReadyEvent, GridOptions, ModuleRegistry, AllCommunityModule, PaginationChangedEvent, FilterChangedEvent, SortChangedEvent, IDatasource } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { CheckboxHeader } from '@shared/components/form/checkbox-header/checkbox-header';
import { CheckboxCellRender } from '@shared/components/form/checkbox-cell-render/checkbox-cell-render';
import { ActionsCellRenderer } from '@shared/components/form/actions-cell-renderer/actions-cell-renderer';
import { DateRangeComponent } from '@shared/components/form/date/date';
import { DetailInvoiceModal } from '@core/interfaces/modals.interface';
import { Observable } from 'rxjs';
import { TabsModule } from 'primeng/tabs';

const mockData = {
  rows: [
    { id: 1, name: 'Invoice 1', amount: 100, status: 'offered' },
    { id: 2, name: 'Invoice 2', amount: 200, status: 'current' },
    { id: 3, name: 'Invoice 3', amount: 300, status: 'settled' }
  ],
  totalCount: 3
}

const mockObservable = new Observable((observer) => {
  observer.next(mockData);
  observer.complete();
})


@Component({
  selector: 'app-invoice-valuator',
  standalone: true,
  imports: [TabsModule, AgGridAngular],
  templateUrl: './invoice-valuator.html',
  styleUrl: './invoice-valuator.scss'
})
export class InvoiceValuator implements OnInit {

  constructor() {
    ModuleRegistry.registerModules([AllCommunityModule])
  }

  localeText = {
    page: 'Página',
    to: '-',
    of: 'de',
    next: 'Siguiente',
    previous: 'Anterior',
    loadingOoo: 'Cargando datos...',
    noRowsToShow: 'No hay filas para mostrar',
  };


  ngOnInit(): void {
    this.gridOptions.columnDefs = this.coumnDef
    this.gridOptions.rowModelType = 'infinite';
    //this.gridOptions.rowData = this.datax
    this.coumnDef.push(
      {
        field: 'Actions',
        headerName: '',
        width: 100,
        pinned: 'right',
        cellRenderer: ActionsCellRenderer,
        cellRendererParams: {
          onViewDetails: this.onViewDetails.bind(this)
        }
      }
    )

    this.coumnDef.unshift(
      {
        field: 'select',
        headerName: '',
        sortable: false,
        filter: false,
        width: 50,
        pinned: 'left',
        headerComponent: CheckboxHeader,
        cellRenderer: CheckboxCellRender,
        cellRendererParams: {
          onSelectionChange: this.onSelectionChange.bind(this)
        }

      }
    )
  }

  selectedRows: any[] = []
  gridApi!: any;


  onSelectionChange(row: any, isSelected: boolean) {
    if (isSelected) {
      this.selectedRows.push(row)
    } else {
      this.selectedRows = this.selectedRows.filter(r => r !== row)
    }
  }

  private coumnDef: ColDef[] = ColumnInvoicesOfferedAG





  gridOptions: GridOptions = {
    cacheBlockSize: 10,
    defaultColDef: {
      flex: 1,
      minWidth: 100,
      sortable: true,
      filter: true,
      resizable: true
    },
    domLayout: 'autoHeight',
    suppressCellFocus: true,
    rowHeight: 30,
    headerHeight: 30,
    pagination: true,
    paginationPageSize: 1,
    // onGridSizeChanged: (params) => {
    //   params.api.sizeColumnsToFit()
    // },
    // onPaginationChanged: this.onPaginationChanged.bind(this),
    // onFilterChanged: this.onFilterChanged.bind(this),
    // onSortChanged: this.onSortChange.bind(this),
    //onGridReady: this.onGridReady.bind(this)
  }

  private readonly columnsOffered = ColumnInvoicesOffered
  private readonly columnsCurrent = ColumnInvoicesCurrent
  private readonly columnsSettled = ColumnInvoicesSettled
  private readonly ActionsOffered = ActionsInvoicesOffered
  private readonly tabsInvoice = tabsInvoiceValuator
  private readonly keysInvoice = keysInvoiceValuator

  keys = this.keysInvoice
  actions: actions[] = this.ActionsOffered

  tabs: Tabs[] = this.tabsInvoice
  activeTab: string = this.tabs[0].key;

  modalView = false
  invoiceModal: DetailInvoiceModal[] = []



  //Mocks
  datax = invoicesMock

  //Graficas
  category = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  renderChart = false

  onSortChange(event: any) {
    const firstSortedColumn = event.columns[event.columns.length - 1]
    const sort = firstSortedColumn?.sort
    const column = firstSortedColumn?.colId
    console.log('short - column', `${sort} - ${column}`)
  }

  onPaginationChanged(event: PaginationChangedEvent) {
    console.log('event pagination', event.api.paginationGetCurrentPage() + 1)
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    const dataSource: IDatasource = {
      rowCount: 10,
      getRows: (params: any) => {
        const queryParams = {
          startRow: params.startRow,
          endRow: params.endRow,
          sortField: params.sortModel[0]?.colId || '',
          sortOrder: params.sortModel[0]?.sort || '',
          filters: params.filterModel,
        };

        console.log('Query params:', queryParams);

        // Simula delay de API
        setTimeout(() => {
          mockObservable.subscribe((response: any) => {
            params.successCallback(response.rows, response.totalCount);
          });
        }, 500);
      }
    }
    params.api!.setGridOption("datasource", dataSource);


    // this.gridApi.setDatasource(dataSource); // ahora sí funciona con 'infinite'
  }

  buildDataSource(): any {
    return {
      getRows: (params: any) => {
        const queryParams = {
          startRow: params.startRow,
          endRow: params.endRow,
          sortField: params.sortModel[0]?.colId || '',
          sortOrder: params.sortModel[0]?.sort || '',
          filters: params.filterModel,
        };

        console.log('Query params:', queryParams);

        // Simula delay de API
        setTimeout(() => {
          mockObservable.subscribe((response: any) => {
            params.successCallback(response.rows, response.totalCount);
          });
        }, 500);
      }
    };
  }




  onFilterChanged(eventFilter: FilterChangedEvent) {
    console.log('evento Filter', eventFilter)
    console.log('evento api', this.gridApi.getFilterModel())
  }

  onViewDetails(row: any) {
    console.log('event', event)
    this.invoiceModal = this.convertObjetoToArray(row)
    this.modalView = true
  }

  convertObjetoToArray(obj: object): DetailInvoiceModal[] {
    return Object.entries(obj).map(([key, value]) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      return {
        label,
        value,
      };
    });
  }

  dateRange(event: { start: string, end: string }) {
    console.log('fechas', event)
  }

  getColumns(key: string) {
    if (key === this.keysInvoice.OFFERED) {
      return this.columnsOffered
    } else if (key === this.keysInvoice.CURRENT) {
      return this.columnsCurrent
    } else if (key === this.keysInvoice.SETTLED) {
      return this.columnsSettled
    }
    return
  }

  validateCheckTab(key: string) {
    if (key === this.keysInvoice.OFFERED) {
      return true
    } else if (key === this.keysInvoice.CURRENT) {
      return true
    } else if (key === this.keysInvoice.SETTLED) {
      return true
    }
    return false
  }

  setActiveTab(key: string) {
    if (key === this.keysInvoice.GRAPHICS) {
      this.renderChart = true
    } else {
      this.renderChart = false
    }

    this.activeTab = key;
  }



  closeModal(event: boolean) {
    this.modalView = event
  }

}
