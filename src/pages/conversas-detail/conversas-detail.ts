import { AuthService } from './../../services/auth.service';
import { UsuarioService } from './../../services/domain/usuario.service';
import { MensagemService } from './../../services/domain/mensagem.service';
import { StorageService } from './../../services/storage.service';
import { MensagemDTO } from './../../models/domain/mensagem.dto';
import { ConversasDTO } from './../../models/domain/conversa.dto';
import { ConversaService } from '../../services/domain/conversa.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-conversas-detail',
  templateUrl: 'conversas-detail.html',
})
export class ConversasDetailPage {

  conversa : ConversasDTO;
  mensagens : MensagemDTO[];
  emailUsuario : string;
  nameOtherUsuarioName: string = '';
  mensagem  = {
    conteudo: '',
    usuario : {id: '1'},
    conversa : {id: '1'}
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conversaService: ConversaService,
    public storage: StorageService,
    public mensagemService: MensagemService,
    public usuarioService: UsuarioService,
    public auth: AuthService) {
  }

  ionViewDidLoad() {
    this.usuarioLoggedIn();
    this.emailUsuario = this.storage.getLocalUser().email;
    let conversaId = this.navParams.get('conversaId');
    this.conversaService.findById(conversaId)
      .subscribe(response => {
        this.mensagens = response.mensagens;
        this.conversa = response;
        this.mensagem.conversa.id = response.id;
        this.usuarioName();
      }, error =>{})
  }

  submitText(){
    this.mensagemService.insert(this.mensagem)
      .subscribe(response => {
        this.conversaUpdateView();
        this.mensagem.conteudo = ''
      }, error => {})
  }

  conversaUpdateView(){
    this.conversaService.findById(this.conversa.id)
      .subscribe(response =>{
        this.mensagens = response.mensagens;
        this.conversa = response;
      }, error=>{})
  }

  usuarioLoggedIn(){
    this.usuarioService.findByEmail(this.storage.getLocalUser().email)
      .subscribe(response =>{
        this.mensagem.usuario.id = response.id;
      }, error=>{})
  }

  usuarioName(){
    for(let i = 0 ; i < this.conversa.usuarios.length; i++ ){
      if( this.emailUsuario != this.conversa.usuarios[i].email){
        this.nameOtherUsuarioName = this.conversa.usuarios[i].nome;
      }
    }
  }

}
