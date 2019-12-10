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

  constructor(
    public menuCtrl: MenuController,
    private router: Router, 
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events
  ) {
    this.initializeApp();

    this.sess_staff_name = localStorage.getItem("sess_staff_name");
    this.sess_staff_phone = localStorage.getItem("sess_staff_phone");

    events.subscribe('userLogin', (data) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.sess_staff_name = localStorage.getItem("sess_staff_name");
      this.sess_staff_phone = localStorage.getItem("sess_staff_phone");
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
    this.menuCtrl.enable(false);
    this.router.navigate(['/signin']);
  }

  moveDasboard() {
    this.menuCtrl.close();
    this.router.navigate(['/dashboard']);
  }

  moveProfile() {
    this.menuCtrl.close();
    this.router.navigate(['/editprofile']);
  }
    
}
