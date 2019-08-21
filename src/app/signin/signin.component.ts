import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, Platform, AlertController, MenuController, LoadingController } from '@ionic/angular';
import { empty } from 'rxjs';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  email: String;
  password: String;
  requestHeader: any = new HttpHeaders();

  constructor(
    public menuCtrl: MenuController,
    private router: Router, 
    private data: DataService,
    public alertCtrl: AlertController,
    public events: Events,
    public loadingController: LoadingController
  ) { 
    if(localStorage.getItem("sess_staff_name") !== null && localStorage.getItem("sess_staff_name") !== "") {
      this.router.navigate(['/dashboard']);
    }

    this.menuCtrl.enable(false);
    
    //this.requestHeader.append("Accept", 'application/json');
    this.requestHeader.append('Content-Type', 'application/json'); 
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.email = this.signinForm.get('email').value;
    this.password = this.signinForm.get('password').value;

    let sendData = {
      email: this.email,
      password: this.password
    }

    if(this.email != null && this.password != null) {

      this.data.login(sendData).subscribe(
        async res => {  
          if(res.status == true) {       
            console.log(res);

            localStorage.setItem("sess_staff_id", res.data.id);
            localStorage.setItem("sess_staff_name", res.data.first_name+' '+res.data.last_name);
            localStorage.setItem("sess_staff_phone", res.data.phone);
            localStorage.setItem("sess_staff_role", res.data.role);

            this.events.publish('userLogin', JSON.stringify({loggedin: true}));
            this.menuCtrl.enable(true);
            //this.token = res.token;
            // console.log(this.token);
            //localStorage.setItem('token', this.token)
            // let shareData = { token:this.token };
            // this.data.changeMessage(JSON.stringify(shareData));
            this.router.navigate(['/dashboard']); 
          } else {
            //alert(res.message);
            const alert = await this.alertCtrl.create({
              header: 'Error!',
              message: res.message,
              buttons: ['OK']
              });
            alert.present();
          }          
      });
    } else {
      //alert("Enter full credentials!");
      const alert = await this.alertCtrl.create({
        header: 'Error!',
        message: 'Enter full credentials!',
        buttons: ['OK']
        });
      alert.present();

      //console.log("Wrong credentials!");
    }
    
    this.hideLoader();
  }

  async presentLoading(loading) {
    return await loading.present();
  }
  
  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    });
  }

}
