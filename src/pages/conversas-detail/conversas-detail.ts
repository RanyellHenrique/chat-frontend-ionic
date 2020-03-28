import { AuthService } from './../../services/auth.service';
import { UsuarioService } from './../../services/domain/usuario.service';
import { MensagemService } from './../../services/domain/mensagem.service';
import { StorageService } from './../../services/storage.service';
import { MensagemDTO } from './../../models/domain/mensagem.dto';
import { ConversasDTO } from './../../models/domain/conversa.dto';
import { ConversaService } from '../../services/domain/conversa.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EncryptionService } from '../../services/encryption.service';

@IonicPage()
@Component({
  selector: 'page-conversas-detail',
  templateUrl: 'conversas-detail.html',
})
export class ConversasDetailPage {

  conversa : ConversasDTO;
  mensagens : MensagemDTO[];
  emailUsuario : string;
  key: string;
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
    public auth: AuthService,
    public encryptionService: EncryptionService,
    public alertCtrl : AlertController) {
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
    if(this.key != null){
      if(this.mensagem.conteudo.length > 0){
        this.mensagem.conteudo = this.encryptionService
          .encryptOutput(this.mensagem.conteudo, this.key);
        this.mensagemService.insert(this.mensagem)
          .subscribe(response => {
            this.mensagem.conteudo = ''
            this.conversaUpdateView();
          }, error => {})
      }
    }else{
      this.keyCryptografia();
    }
  }

  conversaUpdateView(){
    this.conversaService.findById(this.conversa.id)
      .subscribe(response =>{
        this.mensagens = response.mensagens;
        this.conversa = response;
        this.encryptionService.decryptOutput(this.mensagens, this.key);
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

  keyCryptografia() {
    let alert = this.alertCtrl.create({
        title: 'Chave de Criptografia',
        message: 'Digite a chave',
        enableBackdropDismiss: false,
        buttons: [
            {
              text: 'Ok',
              handler: data => {
                this.key = data.key;
                this.conversaUpdateView();
              }
            }
        ],
        inputs: [
          {
            name: 'key',
            placeholder: 'chave'
          },
        ]
    });
    alert.present();
}

}
