import { UsuarioDTO } from './../../models/domain/Usuario.dto';
import { ConversasDTO } from './../../models/domain/conversa.dto';
import { StorageService } from './../../services/storage.service';
import { ConversaService } from '../../services/domain/conversa.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-conversas',
  templateUrl: 'conversas.html',
})
export class ConversasPage {

  items : ConversasDTO[];
  usuarioEmail: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conversaService: ConversaService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    this.usuarioEmail = this.storage.getLocalUser().email;
    this.conversaService.findAll()
      .subscribe(response => {
        this.items = response;
    },error =>{})
  }

  showDetail(conversaId : string){
    this.navCtrl.push('ConversasDetailPage', {conversaId : conversaId});
  }

  showUsuario(usuarios : UsuarioDTO[]){
    let nameUsuario = '';
    usuarios.forEach((u) =>{
      if( u.email != this.usuarioEmail){
        nameUsuario = u.nome;
      }
    })
    return nameUsuario;
  }
}
