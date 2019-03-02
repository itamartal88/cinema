
import { Movie } from './../../classes/movie';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  public currentMovies = new Subject<Array<Movie>>();
  public noResult:boolean = false;
  public isSelectedMovie:boolean = false;
  public moviesArray:Array<Movie> = [];
  public selectedMovie = new Subject<Movie>();
  public Movie:Movie;
  public starsNumber:number;
  public selectedGif:string;
  constructor() { }

  setCuerrntMovies(movies:Movie[]){
    this.moviesArray = movies;
    this.currentMovies.next(movies);
  }

  setSelectedMovie(movie:Movie){
  this.Movie = movie;
  this.selectedMovie.next(movie);
  }

}
