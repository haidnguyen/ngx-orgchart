import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxOrgchartModule } from 'ngx-orgchart';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxOrgchartModule.withConfig({
      nodeWidth: 300,
      nodeHeight: 120,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
