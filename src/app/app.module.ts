import { ValidatorsService } from './services/validators/validators.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
 import { MetirialModule } from './services/material/material'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpService } from './services/http/http.service';
import { AppService } from './services/app/app.service';
import { MovieComponent } from './components/movie/movie.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { PopupModelComponent } from './components/popup-model/popup-model.component';
import { DeleteComponent } from './components/delete/delete.component';
import { SelectedMovieComponent } from './components/selected-movie/selected-movie.component';
import { TitlePipe } from './pipes/title/title.pipe';
import { starsDirective } from './directives/stars/.directive';


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    TopBarComponent,
    PopupModelComponent,
    DeleteComponent,
    SelectedMovieComponent,
    TitlePipe,
    starsDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MetirialModule
  ],
  entryComponents: [PopupModelComponent,DeleteComponent],
  providers: [HttpService,AppService,ValidatorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }


