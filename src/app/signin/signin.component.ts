import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, Platform, AlertController } from '@ionic/angular';

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

  constructor(private router: Router, private data: DataService, public alertCtrl: AlertController) { 
    //this.requestHeader.append("Accept", 'application/json');
    this.requestHeader.append('Content-Type', 'application/json'); 
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  async onSubmit() {
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
      alert("Enter full credentials!");
      /*const alert = await this.alertCtrl.create({
        header: 'Wrong credentials!',
        message: 'Please enter corrent email id and password!',
        buttons: ['OK']
        });
        alert.present();*/

        console.log("Wrong credentials!");
    }
  }

}
