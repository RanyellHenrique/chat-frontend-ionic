import { MensagemService } from './../../services/domain/mensagem.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversasDetailPage } from './conversas-detail';

@NgModule({
  declarations: [
    ConversasDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ConversasDetailPage),
  ],
  providers:[
    MensagemService
  ]
})
export class ConversasDetailPageModule {}
