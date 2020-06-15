import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomizedCellComponent } from './customized-cell/customized-cell.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AGCustomizeGridExample';
  public columnDefs;
  public dynamicColumnDefs;
  public groupColumnDefs;
  public gridApi;
  public gridColumnApi;
  public gridOptions;
  public sortingOrd;
  public searchValue;
  public frameworkComponents;
  public autoGroupColumnDef;

 

  constructor(private http: HttpClient ){

  }// end constructor()

  ngOnInit(){
    this.dynamicColumnDefs = []
    this.columnDefs = [
      {headerName: 'Client Id', field: 'client_id', width:70, sortingOrder:["asc","desc"] , rowDrag :true },
      {headerName: 'Organization Id', field: 'organization_id' , width:70, rowDrag :true},
      {headerName: 'Scenario Id', field: 'scenario_id' , width:130,   checkboxSelection: true,lockPosition:true, suppressNavigable:true},
      {headerName: 'Scenario Name', field: 'scenario_name' , width:200 , sortingOrder:["desc","asc"], cellRenderer:"customizedScenarioId"},
      {headerName: 'Scenario Description', field: 'scenario_desc' , width:200, editable:true},
      {headerName: 'Module Id', field: 'drive_module_id', width:70,  filter:"agNumberColumnFilter"},
      {headerName: 'Created By', field: 'created_by', width:120},
      {headerName: 'Created On', field: 'created_on', width:220 ,  filter:"agDateColumnFilter"},
      {headerName: 'Last Updated By', field: '_last_updated_by', width:130 },
      {headerName: 'Last Updated On', field: '_last_updated_on', width:220 , sortingOrder:["desc",null] ,  filter:"agDateColumnFilter"},
      {headerName: 'Last Updated By', field: '_last_updated_by', width:130}
    ] 


    this.groupColumnDefs = [
      {headerName: 'Category Name', field: 'category_name' , width:250,  rowGroup: true, hide: true , checkboxSelection: true,lockPosition:true, suppressNavigable:true},
      {headerName: 'Line Name', field: 'line_name', width:200, sortingOrder:["asc","desc"] , rowDrag :true },
      {headerName: 'Line Id', field: 'line_id' , width:130, rowDrag :true},
      {headerName: 'Category Id', field: 'category_id' , width:130,  hide: true , checkboxSelection: true,lockPosition:true, suppressNavigable:true},
      {headerName: 'Close', field: 'close' , width:200 , sortingOrder:["desc","asc"]},
      {headerName: 'True Up', field: 'true_up' , width:200},
      {headerName: 'Pipeline', field: 'pipeline', width:70},
      {headerName: 'Balance Sheet', field: 'balance_sheet', width:120},
      {headerName: 'Subtotal', field: 'subtotal', width:220},
      {headerName: 'POS Accrual', field: 'pos_accrual', width:130},
      {headerName: 'Total', field: 'totals', width:220 , sortingOrder:["desc",null]},
    ] 
  

    this.frameworkComponents = {
      customizedScenarioId : CustomizedCellComponent
    }
    this.sortingOrd = ["asc","desc",null]
    this.autoGroupColumnDef = {
      headerName: 'Category Id',
      field: 'CATEGORY_ID',
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
          checkbox: true
      }
  };


  
  }// end ngOnInit()


  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http
     .get("http://localhost:2424/aggrid")
    //.get("http://localhost:2424/lineTreeGrid")
    .subscribe(data=> {
        // Working dynamic column code
        // var columnData = data[0]
        // for(var key in columnData){
        //   this.dynamicColumnDefs.push({ headerName:key.toLocaleUpperCase().replace("_" , " ") , field:key})
        // }
        // params.api.setColumnDefs(this.dynamicColumnDefs)
        console.warn(data)
        params.api.setRowData(data)
    })
  }// end onGridReady()

  onDoubleClicked(event:any){
    console.warn('row',event);
    alert(event.data.scenario_id +'---->'+ event.data.scenario_name);
  }

  getData(){
    var rowNode = this.gridApi.getDisplayedRowAtIndex(5);
  }  

  quickSearch(){
    this.gridApi.setQuickFilter(this.searchValue);
  }

  showScenarioName(){
    this.gridColumnApi.setColumnsVisible(["scenario_name", "created_by"], true);
    this.gridApi.api.sizeColumnsToFit();
  }

  hideScenarioName(){
    this.gridColumnApi.setColumnsVisible(["scenario_name", "created_by"], false);
    this.gridApi.api.sizeColumnsToFit();
  }

}
