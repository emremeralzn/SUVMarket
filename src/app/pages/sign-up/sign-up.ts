import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
 constructor(
    private fb: FormBuilder,
    private el: ElementRef,
  ) {}
myForm!:FormGroup;

scrollTo(section: string) {
  const el = document.querySelector(`#${section}`);
  el?.scrollIntoView({ behavior: 'smooth' });
}
ngOnInit() {
  window.scrollTo(0, 0);
  this.myForm = this.fb.group({
    nameUserName: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    province: ['', [Validators.required]],
    district: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    repeatEmail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
    verificationCode: ['', [Validators.required]],
    kvkk1: [false, [Validators.requiredTrue]],
    kvkk2: [false, [Validators.requiredTrue]],
  });
}
  ngAfterViewInit() {
 const sections = [
  { id: 'iletisimForm', link: 'link-iletisim' }
];

  window.addEventListener('scroll', () => {
    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      const link = document.getElementById(sec.link);

      if (!el || !link) return;

      const rect = el.getBoundingClientRect();

      if (rect.top <= 200 && rect.bottom >= 150 ) {
        // önce hepsinden active kaldır
        document.querySelectorAll('.title').forEach(item =>
          item.classList.remove('active')
        );

        // sonra aktif olanı ekle
        link.classList.add('active');
      }
     
    }
  );
  });
  
}

  get nameUserName() { return this.myForm.get('nameUserName'); }
  get phone() { return this.myForm.get('phone'); }
  get province() { return this.myForm.get('province'); }
  get district() { return this.myForm.get('district'); }
  get email() { return this.myForm.get('email'); }
  get repeatEmail() { return this.myForm.get('repeatEmail'); }
  get password() { return this.myForm.get('password'); }
  get repeatPassword() { return this.myForm.get('repeatPassword'); }
  get verificationCode() { return this.myForm.get('verificationCode'); }
  get kvkk1() { return this.myForm.get('kvkk1'); }
  get kvkk2() { return this.myForm.get('kvkk2'); }

  onSubmit() {
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
