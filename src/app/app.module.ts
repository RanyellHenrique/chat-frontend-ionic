import { ConversaService } from '../services/domain/conversa.service';
import { AuthInterceptorProvider } from './../interceptors/auth-interceptor';
import { StorageService } from './../services/storage.service';
import { AuthService } from '../services/auth.service';
import { ErrorInterceptorProvider } from './../interceptors/error-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpClientModule} from '@angular/common/http';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioService } from '../services/domain/usuario.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ConversaService
  ]
})
export class AppModule {}
