import { ConversaService } from '../../services/domain/conversa.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConversasDTO } from '../../models/domain/conversa.dto';

/**
 * Generated class for the ConversasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversas',
  templateUrl: 'conversas.html',
})
export class ConversasPage {

  items : ConversasDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conversaService: ConversaService) {
  }

  ionViewDidLoad() {
   this.conversaService.findAll()
    .subscribe(response => {
      this.items = response;
    },error =>{})
  }

  showDetail(conversaId : string){
    this.navCtrl.push('ConversasDetailPage', {conversaId : conversaId});
  }

}
