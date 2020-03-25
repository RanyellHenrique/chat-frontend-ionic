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
  mensagem  = {
    conteudo: '',
    usuario : {id: ''},
    conversa : {id: ''},
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
    this.emailUsuario = this.storage.getLocalUser().email;
    let conversaId = this.navParams.get('conversaId');
    this.conversaService.findById(conversaId)
      .subscribe(response => {
        this.mensagens = response.mensagens;
        this.conversa = response;
      }, error =>{})
  }

  submitText(){
    console.log(this.mensagem);
  }
}
