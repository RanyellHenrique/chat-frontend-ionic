import { ConversasDTO } from '../../models/domain/conversa.dto';
import { StorageService } from '../storage.service';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConversaService{

  constructor( public http : HttpClient,  public storage: StorageService){
  }

  findById(conversaId: string): Observable<ConversasDTO>{
    return this.http.get<ConversasDTO>(`${API_CONFIG.baseUrl}/conversas/${conversaId}`)
  }

  findAll() : Observable<ConversasDTO[]>{
    return this.http.get<ConversasDTO[]>(`${API_CONFIG.baseUrl}/conversas`);
  }

  insert(obj : ConversasDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/conversas`,
        obj,
        {
            observe: 'response',
            responseType: 'text'
        }
    );
  }
}
