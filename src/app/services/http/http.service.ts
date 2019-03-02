
import { searchUrl,url,idUrl } from './../consts/consts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Movie } from "../../classes/movie";
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(public http:HttpClient) { }

  getMovies():Observable<Movie[]>{
    return this.http.get<any>(url).pipe(map(movies => {
    return movies.Search
    },catchError(e => {
      alert(e.status + ' error please try again or refresh this page');
      return e.status
       }
    )));
  }

  searchMovie(name:string):Observable<Movie[]>{
    return this.http.get<any>(searchUrl + name).pipe(map(movies => {
    return movies.Search
    },catchError(e => {
      alert(e.status + ' error please try again or refresh this page');
      return e.status
       }
    )));
  }

  getMovieInfo(id:string):Observable<Movie>{
    return this.http.get<any>(idUrl + id).pipe(map(movies => {
    return movies;
    },catchError(e => {
      alert(e.status + ' error please try again or refresh this page');
      return e.status
       }
    )));
  }
}
