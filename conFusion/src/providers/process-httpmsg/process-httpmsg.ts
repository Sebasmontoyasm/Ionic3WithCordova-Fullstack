import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/observable/throw';


/*
  Generated class for the ProcessHttpmsgProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

/*
  Sorry I had that it use another code for process-httpmsg.ts. 
*/

@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: HttpClientModule) {
    console.log('Hello ProcessHttpmsgProvider Provider');
  }
  
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    return Observable.throw(errMsg);
  }
}