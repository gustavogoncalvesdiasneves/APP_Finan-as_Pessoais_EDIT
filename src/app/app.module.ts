import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './pages/app.component';
import { HelloComponent } from './hello.component';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './pages/home-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HomePageRoutingModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
