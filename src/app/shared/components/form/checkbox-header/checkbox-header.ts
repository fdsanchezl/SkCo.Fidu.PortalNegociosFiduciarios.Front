import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-checkbox-header',
  imports: [],
  templateUrl: './checkbox-header.html',
  styleUrl: './checkbox-header.scss'
})
export class CheckboxHeader implements IHeaderAngularComp {

params!: any;

agInit(params: any):void{
  this.params = params
}

  onChange(event: any){
    const checked = event.target.checked;
    this.params.api.forEachNode((node:any) => {
      node.isSelected(checked)
    });
  }

  refresh(params: any): boolean{
    return false
  }

}
