import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { InstallButtonComponent } from './core/components/header/install/install-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InstallButtonComponent // Declare the InstallButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}