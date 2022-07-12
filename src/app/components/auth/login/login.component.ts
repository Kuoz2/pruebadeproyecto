import { async } from '@angular/core/testing';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AutentificacionService} from '../../../Service/autentificacion.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UsuarioService} from '../../../Service/usuario.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit, OnDestroy {
  
  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private autentificacion: AutentificacionService,
              private modalService: NgbModal,
              private serviadmin: UsuarioService,
              private spinner: NgxSpinnerService,
              private cd: ChangeDetectorRef
  ) {
        this.ngForm = LoginComponent.CreateLoginFormGroup();
        this.new_admin = LoginComponent.CreateAdmin();

  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  }

  get email() {return this.ngForm.get('email'); }
  get password() {return this.ngForm.get('password'); }

  public closeResult: string;
  public usuarios: boolean = false;

  ngForm: FormGroup;


  new_admin: FormGroup;

// En esta parte se colocan los titulos que saldran en el ninicio de sesion con la informacion.
  owlcarousel = [
    {
      title: 'Bienvenido al Vyt',
      desc: ' Sistema de control',
    },

  ];



  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };
  static CreateLoginFormGroup() {
    return new FormGroup({
      user: new FormGroup({
        rut_user: new FormControl(''),
        email: new FormControl(''),
          password: new FormControl(''),
          rol: new FormControl('')

      })
    });

  }

  static  CreateAdmin() {
    return new FormGroup({
      user: new FormGroup({
        email: new FormControl('', [Validators.required]),
        rut_user: new FormControl('', [Validators.required]),
        password: new FormControl(''),
          role: new FormControl('', [Validators.required])
      })
    });
  }

  public guardarnuevoadmin(admin) {
      console.log(admin.value.user.rut_user.slice(0, 10).split('.').join(''));
      admin.value.user.password = admin.value.user.rut_user.slice(0, 10).split('.').join('');
      admin.value.user.role = 'administrador';
      this.serviadmin.guardaradmin(admin.value);
  }

   ngOnInit() {

     this.loqumu()

  }


 async loqumu() {

  this.spinner.show("spinnerlogin", {
    type: "pacman",
    size: "large",
    color: "white"
});
    this.autentificacion.mostrar_users().pipe(takeUntil(this.unsubscribe$)).subscribe(
        x => {
             const data = Object.values( x[0]);
                // @ts-ignore
             if (data[0]==true) {

                 this.usuarios = true
                 this.spinner.hide("spinnerlogin")

            }else{
               this.usuarios = false
                this.spinner.hide("spinnerlogin")


            };
            this.cd.markForCheck();  
     
          }   
   
 );


  }

  onLogin(form): void {
      console.log(form.value);
      this.autentificacion.login( form.value );

  }

  cancelar_venta() {

  }
  open(content) {
      console.log(content);
      console.log();
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
