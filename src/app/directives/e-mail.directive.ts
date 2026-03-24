import { Directive, HostListener, Input, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appEmailFormat]',
  standalone: true
})
export class EmailFormatDirective {
  constructor(@Optional() private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    let email = inputElement.value;

    // Boşluk karakterlerini temizle
    const cleanedEmail = email.replace(/\s/g, '');

    // Temizlenmiş değeri input alanına geri yaz
    if (email !== cleanedEmail) {
      inputElement.value = cleanedEmail;
      // Angular'ın form kontrolünü güncelle
      if (this.ngControl?.control) {
        this.ngControl.control.setValue(cleanedEmail, { emitEvent: false });
      }
    }

    // E-posta validasyonunu çalıştır
    this.validateEmail(cleanedEmail);
  }

validateEmail(email: string): void {
  if (!this.ngControl?.control) return;

  const errors: Record<string, any> = {};

  if (!email) {
    errors['required'] = true;
    errors['requiredMessage'] = 'Lütfen bu alanı doldurunuz.';
  } else {
    const emailRegex = /^[a-zA-Z0-9.,_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const beforeAt = email.split('@')[0] || '';
    const letterCount = (beforeAt.match(/[a-zA-Z]/g) || []).length;

    const turkishCharRegex = /[çğıöşüÇĞİÖŞÜ]/;
    const specialCharRegex = /[;:<>()[\]{}"'`~!#$%^&*=+\\|/?]/;

    if (!emailRegex.test(email)) {
      errors['email'] = true;
      errors['invalidEmailMessage'] = 'Lütfen geçerli bir e-posta adresi giriniz.';
    }

    if (letterCount < 2) {
      errors['email'] = true;
      errors['minLetterBeforeAtMessage'] = '@ işaretinden önce en az 2 harf olmalıdır.';
    }

    if (turkishCharRegex.test(email)) {
      errors['email'] = true;
      errors['turkishCharMessage'] = 'Türkçe karakterler kullanılamaz.';
    }

    if (specialCharRegex.test(email)) {
      errors['email'] = true;
      errors['specialCharMessage'] = 'E-posta adresinde özel karakterler kullanılamaz.';
    }
  }

  this.ngControl.control.setErrors(Object.keys(errors).length > 0 ? errors : null);
}
}




@Directive({
  selector: '[passwordInputFormat]',
})
export class PasswordInputFormatDirective implements OnInit {
  @Input() passwordValidationEnabled: boolean = true;
  @Input() minLength: number = 6;
  @Input() requireSpecialChar: boolean = false;
  @Input() requireNumber: boolean = true;
  @Input() requireUppercase: boolean = true;
  @Input() requireLowercase: boolean = true;

  private readonly NUMBER_REGEX = /\d/;
  private readonly UPPERCASE_REGEX = /[A-Z]/;
  private readonly LOWERCASE_REGEX = /[a-z]/;

  constructor(@Optional() private ngControl: NgControl) {}

  ngOnInit() {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    if (this.passwordValidationEnabled) {
      const inputElement = event.target as HTMLInputElement;
      this.validatePassword(inputElement.value);
    } else {
      // Validasyon kapalı ise hataları temizle
      if (this.ngControl?.control) {
        this.ngControl.control.setErrors(null);
      }
    }
  }


  validatePassword(value: string): void {

    if (this.ngControl?.control) {
      const errors: Record<string, any> = this.ngControl.control.errors || {};

      if (!value) {
        errors['required'] = true;
      } else {
        if (value.length < this.minLength) {
          errors['minlength'] = { requiredLength: this.minLength, actualLength: value.length };
        } else {
          delete errors['minlength'];
        }

        if (this.requireNumber &&!this.NUMBER_REGEX.test(value)) {
          errors['number'] = true;
        } else {
          delete errors['number'];
        }

        if (this.requireUppercase &&!this.UPPERCASE_REGEX.test(value)) {
          errors['uppercase'] = true;
        } else {
          delete errors['uppercase'];
        }

        if (this.requireLowercase && !this.LOWERCASE_REGEX.test(value)) {
          errors['lowercase'] = true;
        } else {
          delete errors['lowercase'];
        }
      }

      this.ngControl.control.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }
  }

}
