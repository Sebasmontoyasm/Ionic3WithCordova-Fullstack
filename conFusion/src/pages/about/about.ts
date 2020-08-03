import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit {
  leaders: Leader[];
  errMess: string;

  constructor(
    private leaderservice: LeaderProvider,
    @Inject('BaseURL') private BaseURL) { }
  
  /**
   * The leaderservice is that because,
   *  I used HttpClient for
   *  the previos version don't function correct now (http)
   */

   /**
    * Added my providers leader.ts
    * 
    * new APIs:
    * 
    * import { HttpClient } from '@angular/common/http'; 
    * import { map, catchError } from 'rxjs/operators';
    * 
    * CODE:
    * 
    * getLeaders(): Observable<Leader[]> {
     return this.http.get<Leader[]>(baseURL+'leaders')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
    */
   
  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
        errmess => this.errMess = <any>errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderPage');
  }
}
