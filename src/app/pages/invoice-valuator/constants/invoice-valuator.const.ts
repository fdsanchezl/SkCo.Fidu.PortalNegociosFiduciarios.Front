import { Tabs } from "@core/interfaces/invoice-valuator.interface";

export const keysInvoiceValuator={
    OFFERED:'offered',
    CURRENT:'current',
    SETTLED:'settled',
    GRAPHICS:'graphics'
}

export const tabsInvoiceValuator: Tabs[]= [
    {
        title:'Facturas ofertadas',
        key: keysInvoiceValuator.OFFERED
    },
    {
        title:'Facturas vigentes',
        key:keysInvoiceValuator.CURRENT
    },
    {
        title:'Facturas liquidadas',
        key:keysInvoiceValuator.SETTLED
    },
    {
        title:'Tablero general',
        key:keysInvoiceValuator.GRAPHICS
    }
]