import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {PlayerComponent} from './player/player.component';
import { ListFilesComponent } from './list-files/list-files.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({ declarations: [
        AppComponent,
        PlayerComponent,
        ListFilesComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgbModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
