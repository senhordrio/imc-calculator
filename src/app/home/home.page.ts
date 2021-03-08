import { Component } from '@angular/core';
import { IonCard, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    let message = ""
    if(imc < 18.5){
       message = `Seu IMC é de ${imc.toFixed(2)}, e está classificado como MAGREZA, grau de obesidade 0.`
    }else if(18.5 <= imc && imc <= 24.9 ){
       message = `Seu IMC é de ${imc.toFixed(2)}, e está classificado como NORMAL, grau de obesidade 0.`
    }else if(24.9 < imc && imc <= 29.9 ){
       message = `Seu IMC é de ${imc.toFixed(2)}, e está classificado como SOBREPESO, grau de obesidade I.`
    }else if(29.9 < imc && imc <= 39.9){
       message = `Seu IMC é de ${imc.toFixed(2)}, e está classificado como OBESIDADE, grau de obesidade II.`
    }else{
       message = `Seu IMC é de ${imc.toFixed(2)}, e está classificado como OBESIDADE GRAVE, grau de obesidade III.`
    }
    this.showMessage(message);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
