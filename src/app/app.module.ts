import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxOrgchartModule } from 'ngx-orgchart';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxOrgchartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
