import { AlertController } from 'ionic-angular';
import { MensagemDTO } from './../models/domain/mensagem.dto';
import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService{

  constructor(public alertCtrl : AlertController){
  }

  encryptOutput(mensagem : string, key : string){
    return CryptoJS.AES.encrypt(mensagem.trim(), key.trim()).toString();
  }

  decryptOutput(mensagens : MensagemDTO[], key : string){
    if(mensagens.length > 0){
      if( this.validatorKey(mensagens[0].conteudo, key) != ''){
        mensagens.forEach(mensagem =>{
          mensagem.conteudo = this.validatorKey(mensagem.conteudo, key);
        })
      }else{
        let alert = this.alertCtrl.create({
          title: 'Chave de Criptografia',
          message: 'Não é a chave',
          enableBackdropDismiss: false,
          buttons: [
              {
                text: 'Ok'
              }
          ]
        });
        alert.present();
      }
    }
  }

  validatorKey(mensagem : string, key : string): string{
    return CryptoJS.AES
      .decrypt(mensagem.trim(), key.trim()).toString(CryptoJS.enc.Utf8);
  }

}
