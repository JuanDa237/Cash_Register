import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == "" || arg.length < 3) { //The pipe dont work if the arg .....

      return value;
    }
    else {
      
      const resultPost = []; 

      for(const post of value) {
        //Filter for name
        if(post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          
          resultPost.push(post)
        }
      }

      return resultPost;
    }
    //I just take this in google.
  }
}
