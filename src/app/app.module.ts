import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { CustomizedCellComponent } from './customized-cell/customized-cell.component';
import 'ag-grid-enterprise'
@NgModule({
  declarations: [
    AppComponent,
    CustomizedCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([CustomizedCellComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }