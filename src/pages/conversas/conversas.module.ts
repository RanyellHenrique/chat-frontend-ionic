import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversasPage } from './conversas';

@NgModule({
  declarations: [
    ConversasPage,
  ],
  imports: [
    IonicPageModule.forChild(ConversasPage),
  ],
})
export class ConversasPageModule {}
