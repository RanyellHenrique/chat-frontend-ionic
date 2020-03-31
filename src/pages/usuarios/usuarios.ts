import { StorageService } from './../../services/storage.service';
import { UsuarioDTO } from './../../models/domain/Usuario.dto';
import { ConversasDTO } from './../../models/domain/conversa.dto';
import { ConversaService } from './../../services/domain/conversa.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  items : UsuarioDTO[] = [];
  conversa: ConversasDTO[];
  usuarioLocal : UsuarioDTO;
  conversaCreate: ConversasDTO = {
    id: null,
    usuarios : []
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public conversaService: ConversaService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    this.setUsuarioLocal();
    this.usuarioService.findAll()
      .subscribe(response => {
        this.showUsuarios(response);
        this.imagemShow();
      }, error => {})
  }

  showUsuarios(usuarios : UsuarioDTO[]){
    for(let i=0; i< usuarios.length; i++){
      if(this.storage.getLocalUser().email != usuarios[i].email){
       this.items.push(usuarios[i]);
      }
    }
  }

  Conversas(){
    this.conversaService.findAll()
      .subscribe(response => {
        this.conversa = response;
      }, error => {})
  }

  createConversa(usuario : UsuarioDTO){
    this.conversaCreate.usuarios.push({id: `${usuario.id}`});
    this.conversaService.insert(this.conversaCreate)
      .subscribe(response => {
        this.navCtrl.setRoot('ConversasPage');
      }, error => {})
  }

  setUsuarioLocal(){
    this.usuarioService.findByEmail(this.storage.getLocalUser().email)
      .subscribe(response => {
        this.conversaCreate.usuarios.push({id : `${response.id}`});
      }, error => {})
  }

  imagemShow(){
    this.items.forEach(usuario => {
      let id = Number(usuario.id);
      if(id < 10){
        usuario.imagem = `assets/imgs/user/user${id}.png`;
      }else{
        usuario.imagem = 'assets/imgs/user/usuario.jpg';
      }
    })
  }
}
