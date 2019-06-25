import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { CustomerPage } from '../pages/customer/customer';
import { DetailCustomerPage } from '../pages/detail-customer/detail-customer';
import { ProductPage } from '../pages/product/product';
import { DetailProductPage } from '../pages/detail-product/detail-product';
import { RequestPage } from '../pages/request/request';
import { DetailRequestPage } from '../pages/detail-request/detail-request';
import { AppointmentPage } from '../pages/appointment/appointment';
import { DetailAppointmentPage } from '../pages/detail-appointment/detail-appointment';
import { ReportPage } from '../pages/report/report';
import { DetailReportPage } from '../pages/detail-report/detail-report';
import { GlobalvarProvider } from '../providers/globalvar/globalvar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    CustomerPage,
    DetailCustomerPage,
    ProductPage,
    DetailProductPage,
    RequestPage,
    DetailRequestPage,
    AppointmentPage,
    DetailAppointmentPage,
    ReportPage,
    DetailReportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    CustomerPage,
    DetailCustomerPage,
    ProductPage,
    DetailProductPage,
    RequestPage,
    DetailRequestPage,
    AppointmentPage,
    DetailAppointmentPage,
    ReportPage,
    DetailReportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    RestProvider,
    SQLite,
    GlobalvarProvider,
  ]
})
export class AppModule {}
