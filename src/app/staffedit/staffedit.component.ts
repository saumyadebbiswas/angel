import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-staffedit',
  templateUrl: './staffedit.component.html',
  styleUrls: ['./staffedit.component.scss'],
})
export class StaffeditComponent implements OnInit {

  staff_id: string;

  staff:any = [];
  roles:any = [];
  
  staffEditForm: FormGroup;
  firstname:string;
  lastname: String;
  email: String;
  phone: String;
  role: String;
  
  temp_role:any = [];

  constructor(
    private router: Router, 
    private route:ActivatedRoute,
    private data:DataService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.staffEditForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      //role: new FormControl()
    });

    this.staff_id = this.route.snapshot.paramMap.get('id');

    this.showStaff();
    //this.showRole();
  }

  clickCancel() {
    this.router.navigate(['/staffs']);
  }

  onSubmit() {
    this.firstname = this.staffEditForm.get('firstname').value.trim();
    this.lastname = this.staffEditForm.get('lastname').value.trim();
    this.email = this.staffEditForm.get('email').value.trim();
    this.phone = this.staffEditForm.get('phone').value.trim();

    this.role = this.temp_role.join(',');

    if(this.staff_id == "" || this.staff_id == null || this.firstname == "" || 
    this.lastname == "" || this.email == "" || this.phone == "" || 
    this.role == "" || this.role == null){
      alert('Enter full credentials!');
    } else {

      let sendData = {
        id: this.staff_id,
        first_name: this.firstname,
        last_name: this.lastname,
        email: this.email,
        phone: this.phone,
        role: this.role
      }

      //console.log(sendData);
      this.data.staffEdit(sendData).subscribe(
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

  showStaff() {
    let sendData = {
      staff_id: this.staff_id
    }

    this.data.staffDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.staff = res.data;

          this.staffEditForm.patchValue({
            firstname:res.data.first_name,
            lastname:res.data.last_name,
            email:res.data.email,
            phone:res.data.phone,
            //role:res.data.role
          });

          this.showRole(res.data.role);
        } else {
          this.staff = res.message;
          //console.log("No response");
        }
      });
  }
  
  showRole(data) {
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

    let set_role_arr = data.split(',');
    //console.log('set_role_arr...', set_role_arr);
    
    for(let i=0; i<set_role_arr.length; i++){
      if(set_role_arr[i] == roles[0].type) {
        roles[0].isChecked = true;
        this.temp_role.push(roles[0].type);
      }
      else if(set_role_arr[i] == roles[1].type) {
        roles[1].isChecked = true;
        this.temp_role.push(roles[1].type);
      }
      else if(set_role_arr[i] == roles[2].type) {
        roles[2].isChecked = true;
        this.temp_role.push(roles[2].type);
      }
    }

    //console.log('roles...', roles);
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
