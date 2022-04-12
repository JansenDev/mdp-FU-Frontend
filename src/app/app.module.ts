import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// angular modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// project modules
import { PageModule } from './pages/pages.module';
import { ComponentModule } from './components/component.module';
// external modules
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './core/interceptor/token.interceptor';

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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
