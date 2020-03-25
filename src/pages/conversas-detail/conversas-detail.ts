import { MensagemDTO } from './../../models/domain/mensagem.dto';
import { ConversasDTO } from './../../models/domain/conversa.dto';
import { ConversaService } from '../../services/domain/conversa.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConversasDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversas-detail',
  templateUrl: 'conversas-detail.html',
})
export class ConversasDetailPage {

  conversa : ConversasDTO;
  mensagens : MensagemDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conversaService: ConversaService) {
  }

  ionViewDidLoad() {
    let conversaId = this.navParams.get('conversaId');
    this.conversaService.findById(conversaId)
      .subscribe(response => {
        this.mensagens = response.mensagens;
        this.conversa = response;
      }, error =>{})
  }

}
