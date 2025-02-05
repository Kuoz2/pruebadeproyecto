import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from './shared/shared.module';
import {ProductsModule} from './components/products/products.module';
import {PagesModule} from './components/pages/pages.module';
import {UsersModule} from './components/users/users.module';
import {NgxPrintModule} from 'ngx-print';
import {AuthModule} from './components/auth/auth.module';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,

  ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition( {appId: 'serverApp'} ),
        AppRoutingModule,
        AuthModule,
        SharedModule,
        ProductsModule,
        PagesModule,
        UsersModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgxPrintModule,
             

    ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
