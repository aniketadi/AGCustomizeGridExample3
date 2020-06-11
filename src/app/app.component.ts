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
  public gridApi;
  public gridColumnApi;
  public searchValue;
  public frameworkComponents;

  constructor(private http: HttpClient){

  }// end constructor()

  ngOnInit(){
    this.columnDefs = [
      {headerName: 'Client Id', field: 'client_id', width:70, sortingOrder:["asc","desc"] },
      {headerName: 'Organization Id', field: 'organization_id' , width:70},
      {headerName: 'Scenario Id', field: 'scenario_id' , width:70},
      {headerName: 'Scenario Name', field: 'scenario_name' , width:200 , sortingOrder:["desc","asc"], cellRenderer:"customizedScenarioId"},
      {headerName: 'Scenario Description', field: 'scenario_desc' , width:200},
      {headerName: 'Module Id', field: 'drive_module_id', width:70},
      {headerName: 'Created By', field: 'created_by', width:120},
      {headerName: 'Created On', field: 'created_on', width:220},
      {headerName: 'Last Updated By', field: '_last_updated_by', width:130},
      {headerName: 'Last Updated On', field: '_last_updated_on', width:220 , sortingOrder:["desc",null]},
      {headerName: 'Last Updated By', field: '_last_updated_by', width:130}
    ] 
    this.frameworkComponents = {
      customizedScenarioId : CustomizedCellComponent
    }
  }// end ngOnInit()


  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http
    .get("http://localhost:2424/aggrid")
    .subscribe(data=> {
      console.warn(data)
      params.api.setRowData(data)
    })
  }// end onGridReady()

}
