import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { InvoiceValuator } from './invoice-valuator/invoice-valuator';
import { ProcessView } from './process-view/process-view';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'invoices-valuator', component: InvoiceValuator},
    { path: 'process-view', component: ProcessView},
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
