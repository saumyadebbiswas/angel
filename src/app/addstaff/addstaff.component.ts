import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.scss'],
})
export class AddstaffComponent implements OnInit {
  
  roles:any = [];
  
  staffAddForm: FormGroup;
  firstname:string;
  lastname: String;
  email: String;
  password: String;
  phone: String;
  role: String;

  temp_role:any = [];

  constructor(
    private router: Router, 
    private data:DataService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.staffAddForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      phone: new FormControl(),
      //role: new FormControl()
    });
    
    this.showRole();

    this.staffAddForm.patchValue({
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      phone:""
    });
  }

  clickCancel() {
    this.router.navigate(['/staffs']);
  }

  onSubmit() {
    this.firstname = this.staffAddForm.get('firstname').value.trim();
    this.lastname = this.staffAddForm.get('lastname').value.trim();
    this.email = this.staffAddForm.get('email').value.trim();
    this.password = this.staffAddForm.get('password').value.trim();
    this.phone = this.staffAddForm.get('phone').value.trim();

    this.role = this.temp_role.join(',');

    if(this.firstname == "" || this.lastname == "" || this.email == "" || 
    this.password == "" || this.phone == "" || this.role == "" || 
    this.role == null) {
      alert('Enter full credentials!');
    } else {

      let sendData = {
        first_name: this.firstname,
        last_name: this.lastname,
        email: this.email,
        password: this.password,
        phone: this.phone,
        role: this.role
      }

      console.log(sendData);
      this.data.staffAdd(sendData).subscribe(
        async res => {  
          if(res.status == true) {
            console.log(res);
            this.router.navigate(['/staffs']); 
          } else {
            const alert = await this.alertCtrl.create({
              header: 'Error!',
              message: res.message,
              buttons: ['OK']
              });
              alert.present();
          }          
      });
    }
  }
  
  showRole() {
    // let roles = [
    //   {"type":"1", "name":"Product Manager"},
    //   {"type":"2", "name":"Order Manager"},
    //   {"type":"3", "name":"Marketing Executive"},
    // ];

    // this.roles = roles;

    let roles = [
      { type:'1', name: 'Product Manager', isChecked: false },
      { type:'2', name: 'Order Manager', isChecked: false },
      { type:'3', name: 'Marketing Executive', isChecked: false }
    ];

    this.roles = roles;
  }

  changeChkbx(e, role_type) {
    var isChecked = e.currentTarget.checked;
    if(isChecked) {
      this.temp_role.push(role_type);
      //console.log('Checked......', this.temp_role);
    } else {
      var start_index = this.temp_role.indexOf(role_type);
      var number_of_elements_to_remove = 1;
      var removed_elements = this.temp_role.splice(start_index, number_of_elements_to_remove);
      //console.log('Uncheked......', this.temp_role);
    }
  }

}
