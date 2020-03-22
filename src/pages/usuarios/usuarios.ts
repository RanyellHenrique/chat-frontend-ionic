import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { UsuarioDTO } from '../../models/domain/Usuario.dto';

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  items : UsuarioDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService) {
  }

  ionViewDidLoad() {
    this.usuarioService.findAll()
      .subscribe(response => {
        this.items = response;
      }, error =>{})

  }

}
