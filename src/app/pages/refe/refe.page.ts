import { Component, Input, OnInit } from '@angular/core';
import { Preferences, SetOptions, GetOptions, RemoveOptions, KeysResult } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-refe',
  templateUrl: './refe.page.html',
  styleUrls: ['./refe.page.scss'],
})
export class RefePage implements OnInit {
  @Input() text: string;
  inputText : string ='';
keys = [];
  constructor(private modalCtrl: ModalController) { }

//storge data
  ngOnInit() {}
  ionViewDidEnter(){
    debugger;
    Preferences.clear().then(()=>{

      let i=0;
      let ref = this;
      function inner(){  


        let key = "key" +i.toString();
        let val = "value" +i.toString();

        let options : SetOptions = {
           key: key,
           value: val
        }
        Preferences.set(options).then(()=>{
          i++;
          if(i<4){ 
            inner();
          }else{ 
            ref.getKeys();
          }
        })
      }
inner();
    })
  }

  getValue(key){
    debugger;

    let options: GetOptions = {
      key: key
    }
     Preferences.get(options).then((val)=>{
      
      alert(val.value);
      console.log(`Hello ${val.value}!`);
    
      })
  }

  deleteStorge(key){
    debugger;

    let options : RemoveOptions ={
      key:key
    }
    
    Preferences.remove(options).then(()=>{
      this.getKeys();

      alert("Deleted");
      
       })
}
  getKeys(){
    debugger;

    Preferences.keys().then((keys)=>{
     this.keys = keys.keys;
    })

  }

  clearAll(){
    debugger;

    Preferences.clear().then(()=>{
     this.getKeys();
    })

  }


dismiss(){
  debugger;

  this.modalCtrl.dismiss({inputText: this.inputText});

}

}













// async ngOnInit(){

//   const cartvalue = JSON.stringify([{
//   id:1,
//   prodduct: 'Apple'},
//   {
//     id:2,
//     prodduct: 'Banana'},
//     {
//       id:3,
//       prodduct: 'Mango'
//   }])
//   await Preferences.set({
//     key: 'prodducts',
//     value: cartvalue
//   })
//   await Preferences.set({
//     key: 'user',
//     value: 'Bob'
//   });
//   }
  
//   async getDataFromStorge(){
//     const prodducts = await Preferences.get({ key: 'prodducts'});
//     console.log("🚀  from storge:", JSON.parse(prodducts.value));
//    }
  
//    async removeData(){
//     await Preferences.remove({ key: 'prodducts'})
  
//   }
  
  
//    async getData(){
//     const keys = await Preferences.keys();
//     console.log("🚀  keys:", keys)
//   }
  
//   async clearData(){
//     await Preferences.clear();
    
  
//   }
  