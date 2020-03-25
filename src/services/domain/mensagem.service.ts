import { MensagemDTO } from './../../models/domain/mensagem.dto';
import { StorageService } from '../storage.service';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MensagemService{

  constructor( public http : HttpClient,  public storage: StorageService){
  }

  findById(conversaId: string): Observable<MensagemDTO>{
    return this.http.get<MensagemDTO>(`${API_CONFIG.baseUrl}/mensagens/${conversaId}`)
  }

  findAll() : Observable<MensagemDTO[]>{
    return this.http.get<MensagemDTO[]>(`${API_CONFIG.baseUrl}/mensagens`);
  }

  insert(obj : MensagemDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/mensagens`,
        obj,
        {
            observe: 'response',
            responseType: 'text'
        }
    );
  }
}
