import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.page.html',
  styleUrls: ['./bar.page.scss'],
})
export class BarPage implements AfterViewInit, OnDestroy {
  scanActive= false;
  result= null;
  constructor(private alertController: AlertController ) { }

  ngAfterViewInit(){
    BarcodeScanner.prepare();

    }
  ngOnDestroy(){
BarcodeScanner.stopScan();
    }

    async startScanner(){
    const allowed =await this.checkPermission();
    if(allowed){
    this.scanActive= true;
      const result =await BarcodeScanner.startScan();
      console.log("🚀 ~ file: bar.page.ts ~ line 24 ~ BarPage ~ startScanner ~ result", result);
if(result.hasContent){
  this.result= result.content;
  this.scanActive=false;
      }
    }
  }

   async checkPermission(){
    return new Promise(async (resolve, reject) => {
      const status =await BarcodeScanner.checkPermission({force:true});
      // console.log("🚀 ~ file: bar.page.ts ~ line 30 ~ BarPage ~ checkPermission ~ status", status)
      if (status.granted) {
        // the user granted permission
        resolve(true);
      } else if(status.denied){
        const alert =await this.alertController.create({
          header: 'No permission',
          message: 'Please open camera from your setting',
          buttons: [{
            text: 'No',
            role: 'Cancel'
          },
        {
          text: 'open settings',
          handler: ()=>{
            BarcodeScanner.openAppSettings();
            resolve(false);
          }
        }]
        });
      await alert.present();
      }else{
        resolve(false);
      }
    });
    
}


stopScanner(){
BarcodeScanner.stopScan();
this.scanActive = false; 
}
}
