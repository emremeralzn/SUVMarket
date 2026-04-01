import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-trade-in-form',
  imports: [ReactiveFormsModule],
  templateUrl: './trade-in-form.html',
  styleUrl: './trade-in-form.scss',
})
export class TradeInForm {
  constructor(private fb:FormBuilder,private el: ElementRef) {}
  myForm !: FormGroup;
ngOnInit() {

this.myForm = this.fb.group({
  name: ['',[Validators.required]],
  email: ['',[Validators.required, Validators.email]],
  phone: ['',[Validators.required]],

  numberPlate: ['',[Validators.required]],
  brand: ['',[Validators.required]],
  model: ['',[Validators.required]],
  version: ['',[Validators.required]],

  modelYear: ['',[Validators.required]],
  fuelType: ['',[Validators.required]],
  gearType: ['',[Validators.required]],
  bodyType: ['',[Validators.required]],
  kilometer: ['',[Validators.required]],

  expectedWage: ['',[Validators.required]],
  askingPrice: ['',[Validators.required]],
  verificationCode: ['',[Validators.required]],
  kvkk: [false, Validators.requiredTrue]

});
  window.scrollTo(0, 0);
}



get name() {return this.myForm.get('name');}
get email() {return this.myForm.get('email');}
get phone() {return this.myForm.get('phone');}
get numberPlate() {return this.myForm.get('numberPlate');}
get brand() {return this.myForm.get('brand');}
get model() {return this.myForm.get('model');}
get version() {return this.myForm.get('version');}
get modelYear() {return this.myForm.get('modelYear');}
get fuelType() {return this.myForm.get('fuelType');}
get gearType() {return this.myForm.get('gearType');}
get bodyType() {return this.myForm.get('bodyType');}
get kilometer() {return this.myForm.get('kilometer');}
get expectedWage() {return this.myForm.get('expectedWage');}
get askingPrice() {return this.myForm.get('askingPrice');}
get verificationCode() {return this.myForm.get('verificationCode');}
get kvkk() {return this.myForm.get('kvkk');}





onSubmit(){
  if(this.myForm.valid){
    console.log('Başarılı:', this.myForm.value);
  }
  else{
    this.myForm.markAllAsTouched();
    this.scrollToFirstInvalidControl();
  }
}
scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector('form .ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.focus();
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
