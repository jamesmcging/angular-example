import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

import { HttpClientModule} from '@angular/common/http';
import { ListService } from './list.service';

@NgModule({
    declarations: [
        AppComponent,
        DetailComponent,
        ListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        ListService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
