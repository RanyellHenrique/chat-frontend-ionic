import { MensagemService } from './../../services/domain/mensagem.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversasDetailPage } from './conversas-detail';
import { EncryptionService} from '../../services/encryption.service';

@NgModule({
  declarations: [
    ConversasDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ConversasDetailPage),
  ],
  providers:[
    MensagemService,
    EncryptionService
  ]
})
export class ConversasDetailPageModule {}
