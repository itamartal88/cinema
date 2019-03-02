import { goodMovie,sucksMovie,fineMovie } from './../../services/consts/consts';
import { AppService } from './../../services/app/app.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Movie } from '../../classes/movie';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public allMovies: Movie[];
  constructor(public httpService: HttpService, public AppService: AppService
  ) {
    this.AppService.currentMovies.subscribe(res => this.allMovies = res);
  }

  ngOnInit() {
    this.httpService.getMovies().subscribe((movies: Movie[]) => {
      let allMovis = []
      for (let movie of movies) {
        this.httpService.getMovieInfo(movie.imdbID).subscribe((res: Movie) => {
          res.Year = res.Year.slice(0, 4);
          res.Runtime = res.Runtime.split(" ")[0];
          allMovis.push(res);
        })
      }
      this.AppService.setCuerrntMovies(allMovis);
    })
  }

  openSelectedDiv(movie) {
    this.AppService.isSelectedMovie = false;
    if (movie.imdbRating) {
      this.AppService.starsNumber = Math.round(movie.imdbRating / 2);
    } else {
      this.AppService.starsNumber = 4;
    }
    switch(this.AppService.starsNumber){
      case 1:
      case 2:
      this.AppService.selectedGif = sucksMovie
      break;
      case 3:
      this.AppService.selectedGif = fineMovie
      break;
      case 4: 
      case 5:
      this.AppService.selectedGif = goodMovie
      break;
      default:
      console.log('no gif');
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setTimeout(() => {
      this.AppService.isSelectedMovie = true;
    }, 0);
    this.AppService.setSelectedMovie(movie);
  }

}
