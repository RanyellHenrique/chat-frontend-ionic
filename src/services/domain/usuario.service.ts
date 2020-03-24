import { UsuarioDTO } from './../../models/domain/Usuario.dto';
import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UsuarioService{

  constructor( public http : HttpClient,  public storage: StorageService){

  }

  findAll() : Observable<UsuarioDTO[]>{
    return this.http.get<UsuarioDTO[]>(`${API_CONFIG.baseUrl}/usuarios`);
  }

  findByEmail(email: string) : Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
  }

  insert(obj : UsuarioDTO) {
    return this.http.post(
        `${API_CONFIG.baseUrl}/usuarios`,
        obj,
        {
            observe: 'response',
            responseType: 'text'
        }
    );
  }

}
