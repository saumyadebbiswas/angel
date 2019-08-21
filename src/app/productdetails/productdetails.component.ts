import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {

  //Configuration for Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
  };

  isBeginningSlide: any = true;
  isEndSlide: any = false;

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }
 
  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }
 
  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      this.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      this.isEndSlide = istrue;
    });
  }
  
  // sliderConfig = {
  //   slidesPerView: 1.6,
  //   spaceBetween: 10,
  //   centeredSlides: true
  // };

  // slidesDidLoad(slides) {
  //   slides.startAutoplay();
  // }

  product_id: string;
  product:any = [];
  allimages:any = [];

  constructor(
    private router: Router, 
    private route:ActivatedRoute, 
    private data:DataService
  ) { }

  ngOnInit() {
    //console.log("im called.............");
    
    // this.product_id = this.route.snapshot.paramMap.get('id');
    // console.log(this.product_id);
    // this.showProduct();
  }

  ionViewWillEnter(){
    console.log('ion View Will Enter');
    
    this.product_id = this.route.snapshot.paramMap.get('id');
    console.log(this.product_id);
    this.showProduct();
  }

  showProduct() {
    console.log('show product called.........: ');
    let sendData = {
      product_id: this.product_id
    }

    this.data.productDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.product = res.data;

          let productimages = res.data.productimages;
          if(productimages.length > 0) {
            productimages.forEach(element => {
              this.allimages.push(element.proimg_image_name);
            });
          }
          //console.log('show product called.........: ', this.allimages);
        } else {
          this.product = res.message;
          console.log("No response");
        }
      });
  }
  
  moveProductEdit(product_id) {
    this.router.navigate(['/product/edit/'+product_id]);
  }

}
