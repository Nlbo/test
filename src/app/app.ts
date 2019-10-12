import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './routes';
import { AppComponent } from './controller';
import { HttpModule } from '@platform/modules/http/http.module';
import { ToasterModule } from '@platform/modules/toaster/toaster.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule.forRoot(),
    ToasterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
