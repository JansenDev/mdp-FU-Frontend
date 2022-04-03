import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// angular modules
import { HttpClientModule } from '@angular/common/http';
// project modules
import { PageModule } from './pages/pages.module';
import { ComponentModule } from './components/component.module';
// external modules
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,

    PageModule,
    ComponentModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
