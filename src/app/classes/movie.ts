import { deafultImg } from './../services/consts/consts';
let idNUmber:number = 0;
export class Movie{
    Title:string;
    Year:string;
    Runtime:string;
    Genre:string;
    Director:string;
    imdbID: string;
    Poster:string;

    constructor(title:string,year:string,runTime:string,genre:string,
    director:string,lengthId:number){
    this.Title = title;
    this.Year = year;
    this.Runtime = runTime;
    this.Genre = genre;
    this.Director = director;
    this.imdbID = this.generateId();   
    this.Poster = deafultImg;
    }

    private generateId(){
        idNUmber++;
        return idNUmber.toString();
    }
}