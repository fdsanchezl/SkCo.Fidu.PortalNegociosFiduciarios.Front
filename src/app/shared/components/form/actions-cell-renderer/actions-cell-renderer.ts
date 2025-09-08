import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-actions-cell-renderer',
  imports: [],
  templateUrl: './actions-cell-renderer.html',
  styleUrl: './actions-cell-renderer.scss'
})
export class ActionsCellRenderer implements ICellRendererAngularComp {
  

  params!: any;

  agInit(params:any):void{
    this.params= params
  }

  actionEventClick(){
    this.params.onViewDetails(this.params.node.data)
  }

  refresh(params:any): boolean{
    return false
  }
  
}
