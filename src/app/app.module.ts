import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PageModule } from './pages/pages.module';
import { ComponentModule } from './components/component.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,
    PageModule,

    ComponentModule,
    // SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
