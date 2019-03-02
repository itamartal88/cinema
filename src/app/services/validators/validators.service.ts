
import { englishAndSpaceRegex } from './../consts/consts';
import { AppService } from './../app/app.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  constructor(public appService: AppService) {}

  ValidateYear(control: AbstractControl) {
    if (control.value != "") {
      if (isNaN(control.value) || control.value < 1900 || control.value > 2019) {
        return { validYear: true };
      }
    }
    return null;
  }

  ValidateRunTime(control: AbstractControl) {
    if (control.value != "") {
      if (isNaN(control.value) || control.value > 300) {
        return { validRunTime: true };
      }
    }
    return null;
  }

  checkIfMovieNameEcxistAdd(control: AbstractControl) {
   for(let movie of this.appService.moviesArray){
     if(control.value.replace(/\s+/g, " ").toLowerCase().trim() == movie.Title.toLowerCase()){
       return {validMovieNameEcxist:true}
     }
   }
    return null
  }

  checkIfMovieNameEcxistEdit(name:AbstractControl){
    for(let movie of this.appService.moviesArray){
      if(name.value.replace(/\s+/g, " ").toLowerCase().trim() != this.appService.Movie.Title.replace(/\s+/g, " ").toLowerCase().trim() && movie.Title.replace(/\s+/g, " ").toLowerCase().trim() == name.value.replace(/\s+/g, " ").toLowerCase().trim()){
        return {validMovieNameEcxist:true}
      }
    }
     return null;
  }
}
