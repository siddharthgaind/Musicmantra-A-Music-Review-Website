import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'

export interface data {
   name:string;
}

@Injectable()
export class GetSet {
  shareData: data={name:"nyks"};
  
  saveData(str){
    console.log('data function before save is called ' + this.shareData.name);
    this.shareData.name=str; 
    console.log('data function after save is called ' + this.shareData.name);
  }
  
  getData()
  {
    console.log(this.shareData.name);
    console.log('get data function called');
    return this.shareData.name;
  }
} 