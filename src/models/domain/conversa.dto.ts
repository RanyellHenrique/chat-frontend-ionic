import { MensagemDTO } from './mensagem.dto';
import { UsuarioDTO } from './Usuario.dto';

export interface ConversasDTO{
  id : string;
  usuarios : UsuarioDTO[];
  mensagens? : MensagemDTO[];
}
