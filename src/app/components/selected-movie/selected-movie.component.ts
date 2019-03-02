import { Movie } from './../../classes/movie';
import { AppService } from './../../services/app/app.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state,style, animate, transition,} from '@angular/animations';
import {MatDialog,MatDialogConfig } from '@angular/material';
import { DeleteComponent } from './../delete/delete.component';
import { PopupModelComponent } from './../popup-model/popup-model.component';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-selected-movie',
  animations: [
    trigger('openClose', [
      state('closed', style({height:'0px'})),
      state('open', style({height:'400px'})),
      transition('open<=>closed', animate('1500ms')),
    ])
  ],
  templateUrl: './selected-movie.component.html',
  styleUrls: ['./selected-movie.component.css']
})
export class SelectedMovieComponent implements OnInit {
  public movie:Movie;
  constructor(public appService:AppService,public dialog:MatDialog,public httpService:HttpService) {
    this.appService.selectedMovie.subscribe(movie => this.movie = movie);
   }

  ngOnInit() {
  }


  closeSelectedDiv(){
    this.appService.isSelectedMovie = false;
  }

  openEditModel(){
    let config = new MatDialogConfig();
    config.panelClass = 'edit-dialog';
    config.height = '600px';
    config.width = '330px';
    config.data = {movie:this.movie};
    const dialogRef = this.dialog.open(PopupModelComponent, config);
  }

  openDeleteModel(){
    let config = new MatDialogConfig();
    config.panelClass = 'edit-dialog';
    config.height = '150px';
    config.width = '350px';
    config.data = {movie:this.movie};
    const dialogRef = this.dialog.open(DeleteComponent, config);
  }

  
}
