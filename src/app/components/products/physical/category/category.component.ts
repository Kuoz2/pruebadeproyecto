import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoriasService} from '../../../../Service/categorias.service';
import {Categories} from '../../../Modulos/Categories';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  public closeResult: string;
  categoriasForm: FormGroup;
  room:string
  otracategoria:any

  categorias: Categories;
  categoriaID: Categories = new Categories();
  p: any;
  private unsubscribe$ = new Subject<void>();

  constructor(private modalService: NgbModal, 
    private formBuilder: FormBuilder,
     private servi: CategoriasService,
      private spinner: NgxSpinnerService,
      private cd: ChangeDetectorRef,
        private router: ActivatedRoute,
        private cookies: CookieService
      ) {
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  }

  ngOnInit() {
    this.spinner.show("spinnerdashcategori", {
      type: "pacman",
      size: "large",
      color: "white"
  })
 
    this.categoriasForm = this.formBuilder.group({
      cnombre: ['']
    });

    this.categoriaAsync();
  }

  categoriaAsync() {
    this.servi.mostrarcategorias().pipe(takeUntil(this.unsubscribe$)).subscribe((res:Categories) => {this.categorias = res; 
      this.cd.markForCheck();
      this.spinner.hide('spinnerdashcategori');
    
    })  }

  guardarcategoria() {
    if(this.categoriasForm.valid){
      this.servi.guardarcategorias(this.categoriasForm)
       this.room = this.router.snapshot.paramMap.get('category')
       this.cookies.set('categoria', this.room) 
    
     //  this.servi.mostrarcategorias().subscribe(res =>  this.socketwebservice.emitEvent({res}))

     return this.otracategoria
     }  }

  open2(content2, catego: Categories): void {
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    localStorage.setItem('idc', catego.id.toString());
    this.editar();

  }

  editarcategoria(categoria: Categories) {
    this.servi.actualizarcategoria(categoria)
    setTimeout(() => {
     this.categoriaAsync()
    }, 1500)
  }

  editar() {
    const id = localStorage.getItem('idc');
    this.servi.mostrarporID(+id).subscribe(data => {this.categoriaID = data; });
  }


  open(content) {
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
