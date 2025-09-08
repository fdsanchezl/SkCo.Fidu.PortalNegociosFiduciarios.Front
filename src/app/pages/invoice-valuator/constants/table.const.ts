import { ColumnType, ColumnTypeAg, actions } from '@core/interfaces/table.interface'

export const ColumnInvoicesOfferedAG: ColumnTypeAg[]  = [
        {
         headerName: "ID titulo",
         field: "idtitulo",
         sortable: true,
          filter:true,
		  resizable:true
        },
        {
         headerName: "ID emisor",
         field: "idemisor",
         sortable: true,
          filter:true,
		  resizable:true
        },
        {
         headerName: "Emisor",
         field: "emisor",
         sortable: true,
          filter:true,
		  resizable:true
        },
        {
         headerName: "ID deudor",
         field: "iddeudor",
         sortable: true,
          filter:true,
		  resizable:true
        },
        {
         headerName: "Deudor",
         field: "deudor",
         sortable: true,
          filter:true,
		  resizable:true
        },
]

export const ColumnInvoicesOffered: ColumnType[]  = [
        {
         label: "ID Titulo",
         key: "idtitulo",
         alignment: "center",
          icon:'icon-Group-5'
        },
        {
         label: "ID Emisor",
         key: "idemisor",
         alignment: "center",
          icon:'icon-Group-5'
        },
        {
         label: "Emisor",
         key: "emisor",
         alignment: "center",
          icon:'icon-Group-5'
        },
        {
         label: "ID Deudor",
         key: "iddeudor",
         alignment: "center",
          icon:'icon-Group-5'
        },
        {
         label: "Deudor",
         key: "deudor",
         alignment: "center",
          icon:'icon-Group-5'
        },
]

export const ColumnInvoicesCurrent: ColumnType[]  = [
  {
   label: "Fecha valoración",
   key: "valoracion",
   alignment: "center",
    icon:'icon-Group-5'
  },
  {
   label: "ID",
   key: "id",
   alignment: "center",
    icon:'icon-Group-5'
  },
  {
   label: "Emisor/Pagador",
   key: "EP",
   alignment: "center",
    icon:'icon-Group-5'
  },
  {
   label: "Valor Factura",
   key: "value",
   alignment: "center",
    icon:'icon-Group-5'
  },
  {
    label: "Fecha vto.",
    key: "datevto",
    alignment: "center",
    icon:'icon-Group-5'
  },
  {
    label: "Fecha real pago",
    key: "dateroyal",
    alignment: "center",
    icon:'icon-Group-5'
  }
 
]

export const ColumnInvoicesSettled: ColumnType[]  = [
  {
   label: "ID Titulo",
   key: "idtitulo",
   alignment: "center",
    icon:'icon-Group-5'
  },
  {
   label: "No. Pago",
   key: "pay",
   alignment: "center",
    icon:'icon-Group-5'
  },
  {
   label: "ID Emisor",
   key: "idemisor",
   alignment: "center",
    icon:'icon-Group-5'
  },
  {
   label: "Emisor",
   key: "Emisor",
   alignment: "center",
    icon:'icon-Group-5'
  },
  {
   label: "Id Deudor",
   key: "iddeudor",
   alignment: "center",
    icon:'icon-Group-5'
  },
  {
    label: "Deudor",
    key: "deudor",
    alignment: "center",
     icon:'icon-Group-5'
   },
]

export const ActionsInvoicesOffered: actions[]=[
    {
        text: "Ver",
        icon: "fa-eye",
        name: "view_row",
        color: "primary"
    }
]
