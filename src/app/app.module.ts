import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { IconsModule } from './icons/icons.module';
import { InvestmentsModule } from './investments/investments.module';
import { NetWorthModule } from './net-worth/net-worth.module';
import { AppRoutingModule } from './routing/app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    CoreModule,
    InvestmentsModule,
    NetWorthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
