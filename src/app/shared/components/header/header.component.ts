import { VentasService } from './../../../Service/ventas.service';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavService} from '../../service/nav.service';
import {AutentificacionService} from '../../../Service/autentificacion.service';
import {Router} from '@angular/router';
import {ProductserviceService} from '../../../Service/productservice.service';
import {Mermas} from '../../../components/Modulos/mermas';
import {error} from 'selenium-webdriver';
import {__await} from 'tslib';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public right_sidebar = false;
  public open = true;
  public openNav = false;
  public isOpenMobile: boolean;
  private Actualmermas: Mermas[];
  private mermasnogestionadas = [];
  public cantidad;
  public proIn = 0;
  public ventarapida: FormGroup;
  public closeResult: string;
  public option1= "hola"
  get codigo_producto(){return this.ventarapida.get('codigo_producto')}
  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  // tslint:disable-next-line:max-line-length
  constructor(public navServices: NavService,
              private offsession: AutentificacionService,
              private router: Router,
              private Cmemrmas: ProductserviceService) {


               }

  

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar;
    this.rightSidebarEvent.emit(this.right_sidebar);
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  cerrarsession() {
    this.offsession.logout();
    this.router.navigateByUrl('/login');
  }


    mermas() {
    return this.Cmemrmas.mermasdeldia().toPromise().then(
        res => {
          console.log('Mermas', res);
          this.Actualmermas = res;
          // tslint:disable-next-line:no-shadowed-variable
          this.Actualmermas.map((res) => {
            if (res.solution_boolean === false) {
              this.mermasnogestionadas.push(res);
            }
          });
          this.cantidad = this.mermasnogestionadas.length;
        }
    );
  }

  inventario_gestionable() {
    return this.Cmemrmas.inventario_gestion().then(
        res => {
                // @ts-ignore
          this.proIn = res.length;
          console.log('cantidad', this.proIn);
        }
    );
  }

   ngOnInit(): void {
     
    this.mermas().catch(
        // tslint:disable-next-line:no-shadowed-variable
        error => {console.log('el error', error); }
    ).finally();

    this.inventario_gestionable().catch(error => {
      {console.log('error inventario', error); }
    }).finally();
  }

  emitiralerta() {
    alert('hola');
  }

 


  checkBoxk(){
    var check= <HTMLInputElement>  document.querySelector('input[name="dato1"]')

    if(check.checked != false){
      const inputs = <HTMLInputElement> document.getElementById('manualcode')
      inputs.value = ""
      this.ventarapida.value.codigo_producto = ""
      document.getElementById('manualcode').hidden = true
      document.getElementById('manualcode1').hidden = true
     
    }else{
      const input = <HTMLInputElement> document.getElementById('manualcode')
      input.value = ""
      this.ventarapida.value.codigo_producto = ""
      document.getElementById('manualcode').hidden = false
      document.getElementById('manualcode1').hidden = false
      
    }
  }
  checkBoxk2(){
    const check= document.querySelector('#input[name="dato"]:checked');
    console.log("chquiado", check)
  }



}
