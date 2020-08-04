import { Component } from '@angular/core';
import { IonicPage, ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  commentGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              public viewCtrl: ViewController) {

    this.commentGroup = this.formBuilder.group({
      author:['', Validators.required],
      rating:[1, Validators.required],
      comment:['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  onSubmit() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.viewCtrl.dismiss(this.commentGroup.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
