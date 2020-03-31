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
  keyValidator: boolean = false;
  nameOtherUsuarioName: string = '';
  mensagem  = {
    conteudo: null,
    usuario : {id: null},
    conversa : {id: null}
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
    let conversaId;
    this.navParams.get('conversaId') ? conversaId = this.navParams.get('conversaId')
      : conversaId = this.storage.getLocalConversaId();
    this.conversaService.findById(conversaId)
      .subscribe(response => {
        this.conversa = response;
        this.mensagens = response.mensagens;
        this.mensagem.conversa.id = response.id;
        this.usuarioName();
        this.imagemShow();
      }, error =>{})
    this.dataUpdate();
  }

  submitText(){
    if(this.key != null && this.keyValidator){
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
        this.imagemShow();
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
                this.keyValidator = this.encryptionService
                  .validatorKey(this.mensagens, this.key);
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

  imagemShow(){
    this.mensagens.forEach(mensagem => {
      let id = Number(mensagem.usuario.id);
      if(id < 10){
        mensagem.usuario.imagem = `assets/imgs/user/user${id}.png`;
      }else{
        mensagem.usuario.imagem = 'assets/imgs/user/usuario.jpg';
      }
    })
  }

  dataUpdate(){
    setInterval(() =>{this.conversaService.findById(this.conversa.id)
      .subscribe(response => {
        this.dataVerification(response.mensagens);
      }, error => {})
    }, 5000)
  }

  dataVerification(mensagens : MensagemDTO[]){
    if(mensagens.length != this.mensagens.length){
      this.mensagens = mensagens;
      this.keyValidator ? this.encryptionService.decryptOutput(this.mensagens, this.key) : '';
      this.imagemShow();
    }
  }
}
