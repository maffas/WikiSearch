import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { BodyComponent } from './body/body.component';
import { PaginationComponent } from './body/pagination/pagination.component';
import { ModalComponent } from './input-search/modal/modal.component';
import { CollorFillComponent } from './collor-fill/collor-fill.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputSearchComponent,
    BodyComponent,
    PaginationComponent,
    ModalComponent,
    CollorFillComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
