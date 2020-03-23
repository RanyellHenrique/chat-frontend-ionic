import { UsuarioDTO } from './../../models/domain/Usuario.dto';
import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
    return this.http.get<UsuarioDTO>(
        `${API_CONFIG.baseUrl}/usuarios/email?value=${email}`,
        {'headers': authHeader});
  }
}
