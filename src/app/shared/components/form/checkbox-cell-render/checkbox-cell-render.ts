import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-checkbox-cell-render',
  imports: [],
  templateUrl: './checkbox-cell-render.html',
  styleUrl: './checkbox-cell-render.scss'
})
export class CheckboxCellRender implements ICellRendererAngularComp{

  params!:any;
  isSelected =false
  
  
  agInit(params:any): void{
    this.params = params
    this.isSelected = params.node.isSelected()
  }

  onChange(event:any){
    const checked= event.target.checked
    this.params.onSelectionChange(this.params.node.data, checked)
    this.params.node.setSelected(checked)
  }

  refresh(params:any): boolean{
    this.isSelected = params.node.isSelected()
    return true
  }
}
