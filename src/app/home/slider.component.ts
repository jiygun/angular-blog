import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BannerModel, SlideModel } from 'slider-angular';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit,AfterViewInit {
  objectList:Array<SlideModel>;
  bannerList;
  constructor(private changeDetector: ChangeDetectorRef) { 
    this.objectList=new Array<SlideModel>();
    this.bannerList=new Array<BannerModel>();
  }
  ngAfterViewInit(): void {
    this.objectList=[new SlideModel("../assets/images/angular.jpg"),new SlideModel("../assets/images/typescript.jpg"),new SlideModel("../assets/images/javascript.jpg")];
    this.bannerList=[new BannerModel("../assets/images/angular.jpg"),new BannerModel("../assets/images/typescript.jpg"),new BannerModel("../assets/images/javascript.jpg")];
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
  }
  activeSlide($event){

  }
  clickedSlide($event){

  }
}
