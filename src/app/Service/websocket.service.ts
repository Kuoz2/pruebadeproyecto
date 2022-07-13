import { CookieService } from 'ngx-cookie-service';
import { Injectable, EventEmitter } from '@angular/core';
import {Socket} from  'ngx-socket-io'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService  extends Socket {
  outEvebt: EventEmitter<any> = new EventEmitter();
  callback: EventEmitter<any> = new EventEmitter();
  Marcallback:  EventEmitter<any> = new EventEmitter();
  Bitacoraback: EventEmitter<any> = new EventEmitter();
  constructor(private cooki: CookieService) {super({
    url:'https://vyt-computacion.herokuapp.com' || 'http://localhost:4200/',
    //url:'https://crlproyecto.herokuapp.com',
    options:{
      query:{
        nameRoom: cooki.get('categoria') || cooki.get('marca') || cooki.get('bitacora'),
        
      },
    }
  })
  this.Listen() 
}
Listen(){
  this.ioSocket.on('event', res => this.callback.emit(res))
  this.ioSocket.on('marcaEvnt', res => this.Marcallback.emit(res) )
  this.ioSocket.on('BitacoraEvent', res => this.Bitacoraback.emit(res))
}

emitEvent = (payload = {}) => {
  this.ioSocket.emit('event', payload)
}
emitEventMarca = (payload = {})=> {
  this.ioSocket.emit('marcaEvnt', payload)
}
emitBitacoraEvent = (payload = {})=> {
  this.ioSocket.emit('BitacoraEvent', payload)
}
}
