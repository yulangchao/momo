import { Component, OnDestroy } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'page-login',
  template: `<h1>Angular2 Social login</h1>{{status}}
              <button (click)="signIn('google')">google</button>
              <button (click)="signIn('linkedin')">linkedIn</button>
              <button (click)="signIn('facebook')">facebook</button>
              <button (click)="logout()">logout</button>
              <div *ngIf="user">
                <table>
                  <tr>
                    <td>Name:</td>
                    <td>{{user.name}}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{{user.email}}</td>
                  </tr>
                  <tr>
                    <td>UID</td>
                    <td>{{user.uid}}</td>
                  </tr>
                  <tr>
                    <td>Provider</td>
                    <td>{{user.provider}}</td>
                  </tr>
                  <tr>
                    <td>Image</td>
                    <td>{{user.image}}</td>
                  </tr>
                </table>
              </div>
              `
})
export class LoginPage implements OnDestroy {
  public user;
  sub: any;
  constructor(public _auth: AuthService, public toastCtrl: ToastController,
    public translateService: TranslateService){ }

  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log(data);this.user=data;this.navCtrl.push(MainPage);}
    )
  }

  logout(){
    this._auth.logout().subscribe(
      (data)=>{console.log(data);this.user=null;}
    )
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
