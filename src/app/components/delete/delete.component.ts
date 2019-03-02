import { Movie } from './../../classes/movie';
import { AppService } from './../../services/app/app.service';
import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatDialog} from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteComponent>,
    public appService:AppService ,@Inject(MAT_DIALOG_DATA) public data: any) { dialogRef.disableClose = true; }

  ngOnInit() {
  }

  deleteMovie(){
  for(let i = 0; i < this.appService.moviesArray.length; i++){
    if(this.appService.moviesArray[i].imdbID == this.data.movie.imdbID){
      this.appService.moviesArray.splice(i,1);
    }
  }
  this.appService.setCuerrntMovies(this.appService.moviesArray);
  this.appService.isSelectedMovie = false;
  this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
