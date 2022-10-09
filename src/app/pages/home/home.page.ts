import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  selectedImage: any;

  constructor( private router: Router) { }

  ngOnInit() {
  }


toQrCode(){
  this.router.navigate(['qr']);

}
toMaps(){
  this.router.navigate(['map']);

}




checkPlatformForWeb(){

  if(Capacitor.getPlatform()== 'web' || Capacitor.getPlatform()=='ios' || Capacitor.getPlatform()=='android') return true;
  return false;
}
async getPicture(){
  const image = await Camera.getPhoto({
     quality: 90,
     width:600,
     source:CameraSource.Prompt,
     resultType: this.checkPlatformForWeb() ?CameraResultType.DataUrl : CameraResultType.Uri
   });
 console.log('image: ',image);
 this.selectedImage =image
 if (this.checkPlatformForWeb()) this.selectedImage =image.dataUrl
   }


   async share(){
    await Share.share({
      title: 'share your picture',
      text: 'let share',
      url: this.selectedImage.path,
      dialogTitle: 'Share with whatsapp',
    });
  }



  async openBrowser(){
    await Browser.open({ url: 'https://www.google.com/'

  });
}

//   async getCurrentLocation(){
//     this.getCurrentLocation();

//     try{
//  const coordinates = await Geolocation.getCurrentPosition();

//   console.log('Current position:', coordinates);
//     }catch(e){
//       console.log(e);
//     }
//   }

//   async watchPosition(){
//     this.getCurrentLocation();

//     try{
//  const coordinates = await Geolocation.getCurrentPosition();

//   console.log('Current position:', coordinates);
//     }catch(e){
//       console.log(e);
//     }
//   }

}
