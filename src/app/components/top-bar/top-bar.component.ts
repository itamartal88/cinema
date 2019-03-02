import { PopupModelComponent } from './../popup-model/popup-model.component';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { AppService } from './../../services/app/app.service';
import { Movie } from '../../classes/movie';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public header: string = 'Cinema App';
  public searchText: string;
  constructor(public httpService: HttpService, public AppService: AppService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }


  searchMovie() {
    if (this.searchText.length > 2) {
      this.AppService.isSelectedMovie = false;
      this.httpService.searchMovie(this.searchText).subscribe((movies: Movie[]) => {
        if (movies == undefined) {
          this.AppService.noResult = true;
          this.AppService.setCuerrntMovies([]);
        } else {
          let allMovis = []
          for (let movie of movies) {
            this.httpService.getMovieInfo(movie.imdbID).subscribe((res: Movie) => {
              res.Year = res.Year.slice(0,4);
              res.Runtime = res.Runtime.split(" ")[0];
              allMovis.push(res);
            })
          }
          this.AppService.setCuerrntMovies(allMovis);
          this.AppService.noResult = false;
        }
      })
    }
  }

  openAddModel() {
    var config = new MatDialogConfig();
    config.panelClass = 'edit-dialog'
    config.height = '600px'
    config.width = '330px'
    const dialogRef = this.dialog.open(PopupModelComponent, config);
  }
}
