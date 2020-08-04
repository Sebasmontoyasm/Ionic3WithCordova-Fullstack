import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import {FormBuilder, FormGroup } from '@angular/forms';
import { CommentPage } from '../comment/comment';


/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;
  selectActions: FormGroup;
  comment: Comment;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController) {

    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);

    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);

  }
  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
  
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);

    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();  
  }

  selectAction(){
    this.actionSheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        { text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        },
        { text: 'Add Comment',
          handler: () => {
            let modal = this.modalCtrl.create(CommentPage)
            modal.onDidDismiss(data => {
              this.comment = {
                author: data['author'],
                rating: data['rating'],
                comment: data['comment'],
                date: new Date().toISOString()
              }
              this.dish.comments.push(this.comment);
             });
            
             modal.present();
          }
        },
        { text: 'Cancel',
          role: 'cancel',
        }
      ]
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
}