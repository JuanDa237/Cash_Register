import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxPrinterModule, NgxPrinterService } from 'ngx-printer';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		NgxPrinterModule.forRoot({ printOpenWindow: false })
	],
	providers: [NgxPrinterService],
	bootstrap: [AppComponent]
})
export class AppModule {}
