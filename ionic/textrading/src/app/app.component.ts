import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { firebaseConfig } from './credentials';
import firebase from 'firebase/app';

import 'firebase/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 

  appPages = [
    {
      title: 'Dashboard',
      url: 'profile',
      icon: 'easel'
    },
    {
      title: 'Profile',
      url: 'profile',
      icon: 'settings'
    },
    {
      title: 'Login',
      url: 'login',
      icon: 'log-in-outline'
    },
    {
      title: 'Register',
      url: 'register',
      icon: "custom-user-icon"
    },
    {
      title: 'Post Adv',
      url: 'createitem',
      icon: "custom-user-icon"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      firebase.initializeApp(firebaseConfig);
    });

  }
}
