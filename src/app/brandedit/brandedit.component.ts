import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-brandedit',
  templateUrl: './brandedit.component.html',
  styleUrls: ['./brandedit.component.scss'],
})
export class BrandeditComponent implements OnInit {

  brand_id: string;
  brand:any = [];
  
  brandEditForm: FormGroup;
  name: String;
  detail: String;
  //image_name: String;

  constructor(
    private router: Router, 
    private route:ActivatedRoute,
    private data:DataService,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.brand_id = this.route.snapshot.paramMap.get('id');

    this.showBrand();

    this.brandEditForm = new FormGroup({
      name: new FormControl(),
      detail: new FormControl()
    })
  }

  clickCancel(): void {
    this.router.navigate(['/brands']);
  }

  onSubmit() {
    this.name = this.brandEditForm.get('name').value;
    this.detail = this.brandEditForm.get('detail').value;

    let sendData = {
      id: this.brand_id,
      name: this.name.trim(),
      description: this.detail.trim()
    }

    if(this.brand_id == "" || this.brand_id == null || this.name.trim() == "" || 
    this.detail.trim() == ""){
      alert('Enter full credentials!');
    }
    else{
      console.log(sendData);
      this.data.brandEdit(sendData).subscribe(
        async res => {  
          if(res.status == true) {
            console.log(res);
            this.router.navigate(['/brands']); 
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

  showBrand() {
    let sendData = {
      brand_id: this.brand_id
    }

    this.data.brandDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.brand = res.data;

          this.brandEditForm.patchValue({
            name:res.data.name,
            detail:res.data.description
          });

          console.log(this.brand);
        } else {
          this.brand = res.message;
          console.log("No response");
        }
      });
  }

}
