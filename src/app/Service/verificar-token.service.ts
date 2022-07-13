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


  public URLPROBANDOJTI = 'https://multikart-norte.herokuapp.com/verificador_jti'
  public VsaveProdu = 'https://multikart-norte.herokuapp.com/products/verif_befores_save'
  public VupdateProdu = 'https://multikart-norte.herokuapp.com/products/verif_before_update'
  public verificaCate = 'https://multikart-norte.herokuapp.com/categories/verif_save_category'
  public verificaSbrand='https://multikart-norte.herokuapp.com/brands/verif_befores_save_brand'
  private verificarTax = 'https://multikart-norte.herokuapp.com/taxes/verif_befores_save_taxe'
  private vericarSale= 'https://multikart-norte.herokuapp.com/sales/verif_befores_save_sales'
  private verificarVoucher = 'https://multikart-norte.herokuapp.com/vouchers/verif_befores_save_voucher'
  private verificarQuicksale= 'https://multikart-norte.herokuapp.com/quick_sales/verif_befores_save_quick'
  private verificarDeacrease= 'https://multikart-norte.herokuapp.com/decreases/verif_before_update_decrease'
  private verificarVoucherDetails= 'https://multikart-norte.herokuapp.com/voucher_details/verif_befores_save_d_voucher'
  private verificarProviders = 'https://multikart-norte.herokuapp.com/providers/verif_befores_save_provi'
  private verificarHalfPyme = 'https://multikart-norte.herokuapp.com/half_payments/verif_befores_save_half'
  private verificaUpStock = 'https://multikart-norte.herokuapp.com/stocks/verif_before_update_stock'
  private verifiUpDateExp = 'https://multikart-norte.herokuapp.com/date_expirations/verif_before_update_date'
  private verificaECate = 'https://multikart-norte.herokuapp.com/categories/verif_before_update_category'
  private verificarUpdateProduct ='https://multikart-norte.herokuapp.com/products/verif_before_update'
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
    console.log(this.informacion)
    return   this.http.post(this.VsaveProdu, this.informacion)
    
   }
 
   VerificarUpdateProd(){
     return this.http.post(this.VupdateProdu, this.informacion)
   }
 
   verificarSaveCate(){
     const veri = this.informacion
     return this.http.post(this.verificaCate, veri)
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

   verificaUpdateProd(){
     return this.http.post(this.verificarUpdateProduct, this.informacion)
   }


   
  }
