export interface ColumnType {
    label?: string,
    key?: string,
    width?: number,
    icon?: string,
    type?: 'default' | 'date' | 'currency' | 'decimal' | 'dynamic' | 'percent',
    alignment?: 'left' | 'center' | 'right',
    opt?: {
      decimals?: number
    },
    format?: 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd' | 'yyyy/MM/dd' | 'yyyy-MM-dd HH:mm:ss' | 'yyyy/MM/dd HH:mm:ss' | 'currency' | 'decimal' | 'percentage' | 'phone' | 'email' | 'url' | 'custom',
    customColumn?: (i: number) => any
}

export interface ColumnTypeAg {
    field?: string,
    headerName?: string,
    sortable?: boolean,
    filter?: boolean,
    resizable?:boolean
}

export interface actions{
      text?: string,
      icon?: string,
      name?: string,
      color?: string
}