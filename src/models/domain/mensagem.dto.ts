import { UsuarioDTO } from './Usuario.dto';
import { ConversasDTO } from './conversa.dto';

export interface MensagemDTO{
  id? : string;
  conteudo? : string;
  data? : string;
  conversa? : ConversasDTO;
  usuario? : UsuarioDTO;

}
