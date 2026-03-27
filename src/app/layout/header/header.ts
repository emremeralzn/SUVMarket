import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header{

  constructor(private fb:FormBuilder){ }

  myForm!:FormGroup;

  ngOnInit() {
    this.myForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required,Validators.minLength(3)]]
    });
  }
  get userName(){return this.myForm.get('userName')}
  get password(){return this.myForm.get('password')}


  onSubmit(event?: Event) {
    if (event) {
    event.stopPropagation(); // bu dropdown’un kapanmasını engeller
  }
  if (this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }
  

  
  console.log("Login data:", this.myForm.value);
}

}
