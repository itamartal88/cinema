import { englishAndSpaceRegex } from './../../services/consts/consts';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var title = '';
    for(var i = 0; i < args.length; i++){
     if(englishAndSpaceRegex.test(args[i])){
     title = title + args[i];
     }
    }
    return title;
  }

}
