import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Browser } from '@capacitor/browser';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http'
import { ModalController } from '@ionic/angular';
import { RefePage } from '../refe/refe.page';

const API_KEY = environment.API_KEY;
const API_URL =environment.API_URL;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {
  weatherTemp : any;
  toDayDate = new Date();
  cityName :any;
  weatherIcon: any;
  weatherDetails: any;
  selectedImage: any;

  constructor( private router: Router, public httpClint: HttpClient, private modalCtrl: ModalController) { }

 

  loadData() {
    this.httpClint.get(`${API_URL}/weather?q=${"Jeddah"}&appid=${API_KEY}`).subscribe(results =>{
      console.log("🚀 ~ file: weather.page.ts ~ line 19 ~ WeatherPage ~ this.httpClint.get ~ results", results);
      this.weatherTemp = results['main']
      this.cityName = results['name']
      console.log("🚀 ~ file: home.page.ts ~ line 33 ~ HomePage ~ this.httpClint.get ~ cityName", this.weatherTemp);
this.weatherDetails = results['wather'][0]
console.log("🚀 ~ file: home.page.ts ~ line 36 ~ HomePage ~ this.httpClint.get ~ weatherDetails", this.weatherDetails);
this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherDetails.icon}@2x.png`

      
    })
  }

toQrCode(){
  this.router.navigate(['qr']);

}
toMaps(){
  this.router.navigate(['map']);

}

toBarCode(){
  this.router.navigate(['bar']);
 
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

async goToLocalStorge(){
  let modal = await this.modalCtrl.create({
    component: RefePage,
    componentProps: {
      Text: 'welcome to local storge'
    }
    
  });
  await modal.present();

  let res = await modal.onDidDismiss();
  console.log("🚀 ~ file: home.page.ts ~ line 107 ~ HomePage ~ goToLocalStorge ~ res", res.data);
  // alert(res);
  }
  
}
