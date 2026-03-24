import { Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyText]',
  standalone: true
})
export class OnlyTextDirective {
  @Input() minLength: number = 2; // Varsayılan minimum karakter sayısı
  @Input() maxLength?: number; // Opsiyonel maksimum karakter sayısı

constructor(
  private el: ElementRef,
  @Optional() private ngControl: NgControl
) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    let inputValue = this.el.nativeElement.value as string;

    // E-posta gibi "@" içeriyorsa, '@'ten sonrasını kesip Türkçe/İngilizce harf + boşluk dışında kalanları temizle
    if (inputValue.includes('@')) {
      const [beforeAt] = inputValue.split('@');
      inputValue = beforeAt.replace(/[^a-zA-ZÇçĞğİıÖöŞşÜü ]/g, ' ');
    } else {
      // Normal durumda, harf + Türkçe karakter + boşluk dışındaki her şeyi temizle
      inputValue = inputValue.replace(/[^a-zA-ZÇçĞğİıÖöŞşÜü ]/g, '');
    }

    // Maksimum karakter sınırı kontrolü
    if (this.maxLength && inputValue.length > this.maxLength) {
      inputValue = inputValue.substring(0, this.maxLength);
    }

    // İlk harfi büyük, diğerleri küçük (Türkçe uyumlu)
    inputValue = inputValue
      .toLocaleLowerCase('tr-TR')
      .split(' ')
      .map((word) =>
        word
          ? word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1)
          : ''
      )
      .join(' ');

    // FormControl değerini güncelle
    if (this.ngControl.control) {
      this.ngControl.control.setValue(inputValue, { emitEvent: false });
      
      // Minimum karakter kontrolü ve hata ekleme
      const trimmedValue = inputValue.trim();
      if (trimmedValue.length < this.minLength) {
        this.ngControl.control.setErrors({ 
          minlength: { 
            requiredLength: this.minLength, 
            actualLength: trimmedValue.length 
          } 
        });
      } else {
        // Eğer sadece minLength hatası varsa temizle
        const currentErrors = this.ngControl.control.errors;
        if (currentErrors && currentErrors['minlength'] && Object.keys(currentErrors).length === 1) {
          this.ngControl.control.setErrors(null);
        } else if (currentErrors) {
          delete currentErrors['minlength'];
          this.ngControl.control.setErrors(Object.keys(currentErrors).length > 0 ? currentErrors : null);
        }
      }
    }

    // Input'un görünen değerini güncelle
    this.el.nativeElement.value = inputValue;
  }
}
