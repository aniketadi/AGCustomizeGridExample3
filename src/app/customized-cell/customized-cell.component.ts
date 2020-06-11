import { Component, OnInit } from '@angular/core';
import { ICellRendererComp } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-customized-cell',
  templateUrl: './customized-cell.component.html',
  styleUrls: ['./customized-cell.component.css']
})
export class CustomizedCellComponent implements OnInit, ICellRendererAngularComp {
  public fampvalue: any ;
  public bpvalue : any;
  public cellvalue: any;
  constructor() { }

  ngOnInit(): void {
  }

  agInit(params:any){
    if(params.value.includes('FAMP')){
      this.fampvalue = params.value;
    }else if (params.value.includes('BP')) {
      this.bpvalue = params.value;
    } else {
      this.cellvalue = params.value;
    }
  }

  refresh(params:any):boolean{
    if(params.value.includes('FAMP')){
      this.fampvalue = params.value;
    }else if (params.value.includes('BP')) {
      this.bpvalue = params.value;
    } else {
      this.cellvalue = params.value;
    }
    return true;
  }

}
