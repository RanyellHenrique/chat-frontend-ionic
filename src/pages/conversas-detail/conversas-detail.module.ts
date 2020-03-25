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
})
export class ConversasDetailPageModule {}
