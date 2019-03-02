
import { AppService } from './../../services/app/app.service';
import { Movie } from './../../classes/movie';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { ValidatorsService } from '../../services/validators/validators.service';

@Component({
  selector: 'app-popup-model',
  templateUrl: './popup-model.component.html',
  styleUrls: ['./popup-model.component.css']
})
export class PopupModelComponent implements OnInit {
  public addMode: boolean = false;
  public editMode: boolean = false;

  movieForm = new FormGroup({
    title: new FormControl('', Validators.required),
    year: new FormControl('', [Validators.required,this.validService.ValidateYear]),
    runTime: new FormControl('', [Validators.required,this.validService.ValidateRunTime]),
    genre: new FormControl('', Validators.required),
    director: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<PopupModelComponent>,
    public appService: AppService, public validService:ValidatorsService,
    @Inject(MAT_DIALOG_DATA) public data: any){
      dialogRef.disableClose = true;
     }

  ngOnInit() {
    if (this.data) {
      this.editMode = true;
      this.setFormValue();
    } else {
      this.addMode = true;
    }

    this.title.valueChanges.subscribe((res) => {
      if(this.addMode){
       this.title.setValidators([Validators.required,this.validService.checkIfMovieNameEcxistAdd.bind(this)])
      }else{
        this.title.setValidators([Validators.required,this.validService.checkIfMovieNameEcxistEdit.bind(this)])
      }
    })
  }
 

  closeDialog() {
    this.dialogRef.close();
  }

  setFormValue() {
    this.movieForm.controls['title'].setValue(this.data.movie.Title)
    this.movieForm.controls['year'].setValue(this.data.movie.Year)
    this.movieForm.controls['runTime'].setValue(this.data.movie.Runtime)
    this.movieForm.controls['genre'].setValue(this.data.movie.Genre)
    this.movieForm.controls['director'].setValue(this.data.movie.Director)
  }

  addMovie() {
      let newMovie = new Movie(this.movieForm.value.title, this.movieForm.value.year, this.movieForm.value.runTime,
      this.movieForm.value.genre, this.movieForm.value.director, this.appService.moviesArray.length);
      this.appService.moviesArray.unshift(newMovie);
      this.appService.setCuerrntMovies(this.appService.moviesArray);
      this.dialogRef.close();
  }


  editMovie(){
      for (let i = 0; i < this.appService.moviesArray.length; i++) {
        if (this.appService.moviesArray[i].imdbID == this.data.movie.imdbID) {
          this.appService.moviesArray[i].Title = this.movieForm.value.title;
          this.appService.moviesArray[i].Year = this.movieForm.value.year;
          this.appService.moviesArray[i].Runtime = this.movieForm.value.runTime;
          this.appService.moviesArray[i].Genre = this.movieForm.value.genre;
          this.appService.moviesArray[i].Director = this.movieForm.value.director;
          this.appService.setCuerrntMovies(this.appService.moviesArray);
        }
      }
      this.dialogRef.close();
  }

  get title() { return this.movieForm.get('title'); }
  get year() { return this.movieForm.get('year'); }
  get runTime() { return this.movieForm.get('runTime'); }
  get genre() { return this.movieForm.get('genre'); }
  get director() { return this.movieForm.get('director'); }
}
