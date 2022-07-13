import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { BitacoraService } from './../../../Service/bitacora.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { WebsocketService } from 'src/app/Service/websocket.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {
  room:string
  public closeResult: string;
  public resultado_obtenido;
  constructor(private bitacora: BitacoraService, private spinner: NgxSpinnerService, private router: ActivatedRoute,
    private cookies: CookieService, private webservice: WebsocketService,private modalService: NgbModal) { }
  los_registros:any;
  ngOnInit(): void {
    this.spinner.show("spinnerdashbitacora", {
      type: "pacman",
      size: "large",
      color: "white"
  })

    this.registros_de_la_bitacora()
    setInterval(() => {
      this.registros_de_la_bitacora()
    }, 5000) 
  this.observando();
  
  }
actualizar_registro(){
  const informacion  = () => {
    return new Promise((resolve, reject) => {
      
    })
  }
  return informacion
}
  async registros_de_la_bitacora(){
      return this.bitacora.registros_almacenados().subscribe((res) => {
 
      this.los_registros = res;
      this.room = this.router.snapshot.paramMap.get('bitacora')
      this.cookies.set('bitacora', this.room)
      this.webservice.emitBitacoraEvent({res})
      this.spinner.hide("spinnerdashbitacora")
    })
  }

  observando(): any{
    const bitacora = new Observable(observo => {
      setTimeout(()=> { 
        observo.next(this.los_registros);
      }, 1000)
    })
    return bitacora
  }
  asuntos()
  {
    alert("esto es un asunto")
    console.log("se apreto")
  }

 async obtenerproductoporid(a){
    console.log(a)
    if(a.producto != 0){
    await  this.bitacora.Obtener_Registro_id(a.producto).subscribe((res) => {this.resultado_obtenido = res; console.log("resultado obtenido es", this.resultado_obtenido)} )
    }
  }
 async  open(content, item) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  await  this.obtenerproductoporid(item);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
