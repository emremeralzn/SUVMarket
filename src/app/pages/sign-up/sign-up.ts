import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
 constructor(
    private fb: FormBuilder,
    private el: ElementRef, // Sayfadaki elementlere erişim için
  ) {}
myForm!:FormGroup;

scrollTo(section: string) {
  const el = document.querySelector(`#${section}`);
  el?.scrollIntoView({ behavior: 'smooth' });
}
ngOnInit() {
  window.scrollTo(0, 0);
  this.myForm = new FormGroup({
    nameSurName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    province: new FormControl('', [Validators.required, Validators.pattern('^(?!İl Seçiniz$).*')]),
    district: new FormControl('', [Validators.required, Validators.pattern('^(?!İlçe Seçiniz$).*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    repeatEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
    kvkk1: new FormControl(false, [Validators.requiredTrue]),
    kvkk2: new FormControl(false, [Validators.requiredTrue]),
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
scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector('form .ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.focus();
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
get nameSurName() { return this.myForm.get('nameSurName'); }
get phone() { return this.myForm.get('phone'); }
get email() { return this.myForm.get('email'); }
get subject() { return this.myForm.get('subject'); }
get message() { return this.myForm.get('message'); }
get kvkk() { return this.myForm.get('kvkk'); }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Başarılı:', this.myForm.value);
    } else {
      this.myForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
    }
}
}
