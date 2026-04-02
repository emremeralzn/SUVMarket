import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword {
  constructor(private formBuilder: FormBuilder) {}

  myForm!:FormGroup;

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]]
    });
  }
  onSubmit(){
    if(this.myForm.valid){
      console.log(this.myForm.value);
    }
    this.myForm.markAllAsTouched();

}
}
