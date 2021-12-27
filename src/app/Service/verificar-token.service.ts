import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class respuesta{
  resultado: any;
}
export class VerificarTokenService {


  public URLPROBANDOJTI = 'https://marketmini.herokuapp.com/verificador_jti'
  public VsaveProdu = 'https://marketmini.herokuapp.com/products/verif_befores_save'
  public VupdateProdu = 'https://marketmini.herokuapp.com/products/verif_before_update'
  public verificaCate = 'https://marketmini.herokuapp.com/categories/verif_save_category'
  public verificaSbrand='https://marketmini.herokuapp.com/brands/verif_befores_save_brand'
  private verificarTax = 'https://marketmini.herokuapp.com/taxes/verif_befores_save_taxe'
  private vericarSale= 'https://marketmini.herokuapp.com/sales/verif_befores_save_sales'
  private verificarVoucher = 'https://marketmini.herokuapp.com/vouchers/verif_befores_save_voucher'
  private verificarQuicksale= 'https://marketmini.herokuapp.com/quick_sales/verif_befores_save_quick'
  private verificarDeacrease= 'https://marketmini.herokuapp.com/decreases/verif_before_update_decrease'
  private verificarVoucherDetails= 'https://marketmini.herokuapp.com/voucher_details/verif_befores_save_d_voucher'
  private verificarProviders = 'https://marketmini.herokuapp.com/providers/verif_befores_save_provi'
  private verificarHalfPyme = 'https://marketmini.herokuapp.com/half_payments/verif_befores_save_half'
  private verificaUpStock = 'https://marketmini.herokuapp.com/stocks/verif_before_update_stock'
  private verifiUpDateExp = 'https://marketmini.herokuapp.com/date_expirations/verif_before_update_date'
  private verificaECate = 'https://marketmini.herokuapp.com/categories/verif_befores_save_half'
 private informerespuesta = new Subject<respuesta>()
  constructor(private http: HttpClient) { }
  validacion: any;
  jit:respuesta
  informacion = localStorage.getItem('ACCESS_JTLI')

  // Verificacion de la jti.
  probandojti(){


   this.http.post(this.URLPROBANDOJTI, this.informacion).subscribe(v => {
     console.log("jti", v)
        this.jit = {
          resultado: v
        };
    })
  }
  VerficSaveProd(){
    return   this.http.post(this.VsaveProdu, this.informacion)
    
   }
 
   VerificarUpdateProd(){
     return this.http.post(this.VupdateProdu, this.informacion)
   }
 
   verificarSaveCate(){
     return this.http.post(this.verificaCate, this.informacion)
   }
  
   verificaSaveBrand(){
     return this.http.post(this.verificaSbrand, this.informacion)
   }
   verificarSaveTax(){
     return this.http.post(this.verificarTax, this.informacion)
   }
   
   verificarSaveSale(){
     return this.http.post(this.vericarSale, this.informacion)
   }

   verificarSaveQuickSale(){
      return this.http.post(this.verificarQuicksale, this.informacion)
   }

   verificarSaveVoucher(){
     return this.http.post(this.verificarVoucher, this.informacion)
   }

   verificarSaveVouchDetai(){
    return this.http.post(this.verificarVoucherDetails, this.informacion)
   }

   verificarSaveDecrease(){
     return this.http.post(this.verificarDeacrease, this.informacion)
   }

   verificarSaveProvider(){
     return this.http.post(this.verificarProviders, this.informacion)
   }
  
   vierificarSaveHalfPyme(){
     return this.http.post(this.verificarHalfPyme, this.informacion)
   }

   veriuPsTock(){
     return this.http.post(this.verificaUpStock, this.informacion)
   }

   VerifiUpDateExp(){
     return this.http.post(this.verifiUpDateExp, this.informacion)
   }

   // acutlaizaciones.
   verificarEditCate(){
    return this.http.post(this.verificaECate, this.informacion)

   }
   
  }
