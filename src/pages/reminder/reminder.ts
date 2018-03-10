import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import {Firebase} from '@ionic-native/firebase';

import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'reminder.html',
  providers: [Firebase]
})
export class ReminderPage {
  verificationId: any;
  code: string = "";
  reminderArray: { id: number, name: string }[] = [
    { "id": 0, "name": "Available" },
    { "id": 1, "name": "Ready" },
    { "id": 2, "name": "Started" }
  ];

  constructor(public navCtrl: NavController, private firebasePlugin: Firebase, private alertCtrl:AlertController) {
    
  }

  send() {
    try {
      this.firebasePlugin.verifyPhoneNumber("+919039579039", 60).then (credential=> {
        alert("SMS Sent Successfully - " + JSON.stringify(credential.verificationId));
        console.log(credential);
        
        this.verificationId = credential.verificationId;
      }).catch (error => {
        console.error(error);
      });
    }
    catch(error) {
      alert(error.message)
    }
  }

  verify() {
    let signinCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.code);

    firebase.auth().signInWithCredential(signinCredential).then((info)=>{
      alert("Sign-in Success");
      console.log(info);
    }, (error) => {
      let alert = this.alertCtrl.create({
        title: 'Login Error',
        subTitle: error,
        buttons: ['Dismiss']
      });
      alert.present();
      console.log(error);
    });
  }
}