import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/interceptors/auth/auth.interceptor';
import { TokenInterceptor } from './auth/interceptors/token/token.interceptor';
import { CoreModule } from './core/core.module';
import { InvestmentsModule } from './investments/investments.module';
import { MonthlyDistributionModule } from './monthly-distribution/monthly-distribution.module';
import { NetWorthModule } from './net-worth/net-worth.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { SalaryModule } from './salary/salary.module';
import { SettingsModule } from './settings/settings.module';
import { SharedModule } from './shared/shared.module';

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
    MonthlyDistributionModule,
    SettingsModule,
    AdminModule,
    SalaryModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
