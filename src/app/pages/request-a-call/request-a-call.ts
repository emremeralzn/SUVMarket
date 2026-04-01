import { Component, ElementRef } from '@angular/core';
import { Card } from '../../components/card/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-a-call',
  imports: [Card,ReactiveFormsModule],
  templateUrl: './request-a-call.html',
  styleUrl: './request-a-call.scss',
})
export class RequestACall {
  constructor(private fb:FormBuilder
    ,private el: ElementRef
  ) {}
  myForm!:FormGroup;
  
ngOnInit() {
  this.myForm = this.fb.group({
    name: ['',Validators.required],
    phone: ['',Validators.required],
    email: ['',[Validators.required, Validators.email]],
    verificationCode: ['',Validators.required],
    kvkk: [false, Validators.requiredTrue]
  });
  window.scrollTo(0, 0);
}

get name() {return this.myForm.get('name');}
get phone() {return this.myForm.get('phone');}
get email() {return this.myForm.get('email'); }
get kvkk() {return this.myForm.get('kvkk'); }
get verificationCode() {return this.myForm.get('verificationCode'); }

onSubmit() {
  debugger
    if (this.myForm.valid) {
      console.log('Başarılı:', this.myForm.value);
    } else {
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
