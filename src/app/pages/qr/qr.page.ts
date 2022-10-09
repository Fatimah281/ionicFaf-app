import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage   {
  @ViewChild('video',{static: false}) video: ElementRef;
  @ViewChild('canvas',{static: false}) canvas: ElementRef;

  scanActive= false;
  scanndResult= null;
videoElement: any; 
canvasElement: any; 
canvasContext:any;
loading: HTMLIonLoadingElement;
 

  
  constructor(private ToastCtrl: ToastController, private loadingCtrl: LoadingController) { }

ngAfterViewInit(){
this.videoElement= this.video.nativeElement;
this.canvasElement= this.canvas.nativeElement;
this.canvasContext= this.canvasElement.getContext('2d');

}
async startScan(){
const streem= await navigator.mediaDevices.getUserMedia({
video: {facingMode: 'enviroment'}
});
this.videoElement.srcObject =streem;
this.videoElement.setAttribute('playsinline', true) ;
this.videoElement.play();

this.loading = await this.loadingCtrl.create({});
await this.loading.present();


requestAnimationFrame(this.scan.bind(this));

}



 async scan(){
  console.log('SCAN');
if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
if(this.loading){
await this.loading.dismiss();
this.loading=null;
this.scanActive=true;
}
this.canvasElement.height = this.videoElement.videoHeight;
this.canvasElement.width = this.videoElement.videoWidth;

this.canvasContext.drawImage(

  this.videoElement,
  0,
  0,
  this.canvasElement.width,
  this.canvasElement.height

);
const imagData = this.canvasContext.getImageData (

  this.videoElement,
  0,
  0,
  this.canvasElement.width,
  this.canvasElement.height
);
 
const code =jsQR(imagData.data, imagData.width, imagData.height, {
inversionAttempts: 'dontInvert'
});
console.log('code:',code);

if(code){
  this.scanActive =false;
  this.scanndResult =code.data;
  this.showQrToast();
}else{
  if(this.scanActive){
    requestAnimationFrame(this.scan.bind(this));
  }
}

} else {
  requestAnimationFrame(this.scan.bind(this));

}
 }

stopScan(){
  this.scanActive=false;
}

reset(){
this.scanndResult=null;

}


async showQrToast(){
  const toast = await this.ToastCtrl.create({
  message: `Open ${this.scanndResult}?`,
  position: 'top',
  buttons:[{
      text: 'open',
      handler: () => {
        window.open(this.scanndResult, '_system', 'location=yes');
      }
   }
  ]
});

toast.present();
}

}

