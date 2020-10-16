import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { InvestmentsModule } from './investments/investments.module';
import { NetWorthModule } from './net-worth/net-worth.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    InvestmentsModule,
    NetWorthModule,
    AuthModule,
    BrowserAnimationsModule,
    SettingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
