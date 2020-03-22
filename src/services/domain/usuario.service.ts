import { API_CONFIG } from './../../config/api.config';
import { HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { UsuarioDTO } from '../../models/domain/Usuario.dto';

@Injectable()
export class UsuarioService{

  constructor( public http : HttpClient){

  }

  findAll() : Observable<UsuarioDTO[]>{
    return this.http.get<UsuarioDTO[]>(`${API_CONFIG.baseUrl}/usuarios`);
  }
}
