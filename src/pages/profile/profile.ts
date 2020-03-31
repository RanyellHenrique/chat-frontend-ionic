import { UsuarioService } from './../../services/domain/usuario.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioDTO } from '../../models/domain/Usuario.dto';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  usuario : UsuarioDTO;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.usuario = response;
          this.imagemShow();
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage')
    }
  }

  imagemShow(){
    let id = Number(this.usuario.id);
    if(id < 10){
      this.usuario.imagem = `assets/imgs/user/user${id}.png`;
    }else{
      this.usuario.imagem = 'assets/imgs/user/usuario.jpg';
    }
  }

}
