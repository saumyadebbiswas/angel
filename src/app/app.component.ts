import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  sess_staff_id:any;
  sess_staff_name:any;
  sess_staff_phone:any;

  public appPages = [
    {
      title: 'Sign In',
      url: '/signin',
      icon: 'log-in'
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Edit Profile',
      url: '/edit-profile',
      icon: 'logo-angular'
    }
  ];

  constructor(
    public menuCtrl: MenuController,
    private router: Router, 
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events
  ) {
    this.initializeApp();

    if(localStorage.getItem("sess_staff_name") === null || localStorage.getItem("sess_staff_name") === "") {
      this.router.navigate(['/signin']);
    }

    //this.sess_staff_id = localStorage.getItem("sess_staff_id");  
    
    

    events.subscribe('userLogin', (data) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('event data :.............', data);
      this.getlocalvalue();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  signOut() {
    localStorage.setItem("sess_staff_id", "");
    localStorage.setItem("sess_staff_name", "");
    localStorage.setItem("sess_staff_phone", "");
    localStorage.setItem("sess_staff_role", "");

    this.menuCtrl.close();

    this.router.navigate(['/signin']);
  }

  getlocalvalue(){
    // setTimeout(() => {
      this.sess_staff_name = localStorage.getItem("sess_staff_name");
      this.sess_staff_phone = localStorage.getItem("sess_staff_phone");
    // }, 1000);
    console.log('get local value called..................');    
  }
    
}
