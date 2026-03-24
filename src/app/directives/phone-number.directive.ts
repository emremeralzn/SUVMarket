import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Optional,
  Renderer2,
  Input
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneNumberFormat]',
  standalone: true
})
export class PhoneNumberDirective implements OnInit {

  // Silemeyeceğimiz prefix
  private prefix = '0(5';
  // Maske karakterleri (bunlar silinmeye çalışıldığında
  // önce bir adım sola gidip rakamı silmek istiyoruz)
  private maskChars = ['(', ')', ' ', '-'];
  /**
   * Telefon alanına girebileceğiniz maksimum karakter sayısı.
   * Örnek: 16 => "0(5__) ___ __ __"
   */
  @Input() maxLength: number = 16;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Optional() private ngControl: NgControl
  ) { }

  ngOnInit(): void {
    // Placeholder'ı set et
    const inputElement = this.el.nativeElement as HTMLInputElement;
    if (!inputElement.placeholder) {
      inputElement.placeholder = '0(5__) ___ __ __';
    }
  }

  /**
   * Input odaklandığında:
   * - Boşsa otomatik "0(5" ile başlatır.
   * - İmleci uygun yere konumlandırır.
   */
  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    // Boşsa "0(5" ile başlat
    if (!value.startsWith('0(5')) {
      value = '0(5';
      this.renderer.setProperty(inputElement, 'value', value);
    }

    // İmleci en son geçerli karakterin sağına getiriyoruz
    setTimeout(() => {
      const idx = value.indexOf('_');
      const cursorPos = idx >= 0 ? idx : value.length;
      inputElement.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  }
  /**
   * Input alanından çıktığımızda (blur),
   * telefon numarası kısmi girilmişse hata ver.
   */
  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent): void {
    this.validatePhoneNumber(event);
  }

  /**
   * Klavye tuşlarına basıldığında:
   * - `Backspace` ve `Delete` ile "0(" ve "5" karakterlerinin silinmesini engeller.
   * - Rakam dışında karakter girişine izin vermez.
   * - Özel durumları yönetir.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const inputEl = this.el.nativeElement as HTMLInputElement;
    const value = inputEl.value;
    const cursorPos = inputEl.selectionStart ?? 0;
    const selectionEnd = inputEl.selectionEnd ?? 0;
    const selectionLen = selectionEnd - cursorPos;

    // Sadece BACKSPACE örneği (Delete için benzer mantığı ekleyebilirsiniz)
    if (event.key === 'Backspace') {
      // 1) Kullanıcı metnin tamamını seçmişse, prefix dâhil her şeyi silmek mi istiyorsunuz?
      //    İsterseniz burada "tamamını sil" mantığı da uygulayabilirsiniz.
      //    Ama prefix'i asla silmeyecekseniz, bu da engellenebilir.
      if (selectionLen === value.length) {
        // Tüm metin seçili => prefix'i koruyacak şekilde sıfırla
        event.preventDefault();
        inputEl.value = this.prefix; // Sadece 0(5 bırakalım
        inputEl.setSelectionRange(this.prefix.length, this.prefix.length);
        return;
      }

      // 2) Cursor, prefix'in içindeyse => silmeyi engelle
      //    Örneğin prefix uzunluğu 3 => [0:'0',1:'(',2:'5']
      //    Cursor konumu 3. index’ten (yani prefix.length) küçükse => engelle
      if (cursorPos <= this.prefix.length) {
        event.preventDefault();
        return;
      }

      // 3) Normal Backspace akışı
      //    Silinmek istenen karakter index = cursorPos - 1
      let deleteIndex = cursorPos - 1;
      if (deleteIndex < 0) {
        return; // Zaten baştayız
      }

      event.preventDefault(); // Varsayılan silmeyi engelleyeceğiz, manuel yapacağız.

      // Silinecek karakter mask chars içinde mi?
      let charToDelete = value.charAt(deleteIndex);
      while (this.maskChars.includes(charToDelete) && deleteIndex >= 0) {
        // Bir adım daha sola kay
        deleteIndex--;
        charToDelete = value.charAt(deleteIndex);
      }

      // Eğer deleteIndex prefix'in içine girdiyse => silme
      if (deleteIndex < this.prefix.length) {
        // Prefix'e dokunduk => silme
        return;
      }

      // 4) "Gerçek" rakamı sil
      const newValue = value.slice(0, deleteIndex) + value.slice(deleteIndex + 1);
      inputEl.value = newValue;

      // 5) Cursor'u silinen karakterin soluna konumlandır
      const newCursorPos = deleteIndex;
      inputEl.setSelectionRange(newCursorPos, newCursorPos);

      // 6) (Opsiyonel) Sonradan "formatPhoneNumber" metodunu çağırabilirsiniz,
      //    eğer "0(5__) ___ __ __" gibi tam maskeye geri döndürmek istiyorsanız.
      //    Onu yapacaksanız, "silinmiş" rakamı ham veriden de çıkarıp
      //    tekrar formatlamak mantıklı.
    }
  }

  /**
   * Kullanıcı yazdıkça (input event),
   * metni formatla ve doğrula.
   */
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;

    // maxLength kontrolü
    if (inputElement.value.length > this.maxLength) {
      inputElement.value = inputElement.value.substring(0, this.maxLength);
    }

    // 1) Tüm rakamları topla
    let digits = inputElement.value.replace(/\D+/g, '');

    // 2) "05" veya "5" ile başlıyorsa kes -> ham veriyi max 9 hane tut
    if (digits.length >= 2) {
      if (digits.startsWith('05')) {
        digits = digits.substring(2);
      } else if (digits.startsWith('5')) {
        digits = digits.substring(1);
      }
    }
    if (digits.length > 9) {
      digits = digits.substring(0, 9);
    }

    // 3) FormControl'a saf rakamları yaz
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(digits, { emitEvent: false });
    }

    // 4) Ekrana formatlı versiyonu basalım
    const formatted = this.formatPhoneNumber(digits);
    inputElement.value = formatted;

    // 5) Cursor'u bir sonraki '_' (underscore) konumuna taşı.
    setTimeout(() => {
      const underscoreIndex = formatted.indexOf('_');
      const cursorPos = underscoreIndex >= 0 ? underscoreIndex : formatted.length;
      inputElement.setSelectionRange(cursorPos, cursorPos);
    });
  }





  private validatePhoneNumber(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value.replace(/\D+/g, '');

    if (value.length >= 2) {
      if (value.startsWith('05')) {
        value = value.substring(2);
      } else if (value.startsWith('5')) {
        value = value.substring(1);
      }
    }

    if (this.ngControl?.control) {
      const errors = this.ngControl.control.errors || {};

      if (!value || value.trim().length === 0) {
        errors['required'] = true;
        delete errors['minlength'];
      } else {
        delete errors['required'];
        if (value.length < 9) {
          errors['minlength'] = {
            requiredLength: 10,
            actualLength: value.length,
          };
        } else {
          delete errors['minlength'];
        }
      }

      if (Object.keys(errors).length > 0) {
        this.ngControl.control.setErrors(errors);
      } else {
        this.ngControl.control.setErrors(null);
      }
    }
  }

  /**
   * "530123456" gibi (9 rakam) değeri
   * ekranda "0(53) 012 34 56" gibi gösterir.
   */
  private formatPhoneNumber(value: string): string {
    const firstPart = value.substring(0, 2);
    const secondPart = value.substring(2, 5);
    const thirdPart = value.substring(5, 7);
    const fourthPart = value.substring(7, 9);

    let formatted = '0(5';
    formatted += firstPart.padEnd(2, '_');
    formatted += ') ';

    formatted += secondPart.padEnd(3, '_');
    formatted += ' ';

    formatted += thirdPart.padEnd(2, '_');
    formatted += ' ';

    formatted += fourthPart.padEnd(2, '_');

    return formatted;
  }

  /**
   * İmleci, eski ve yeni format farkına göre doğru yerde tutar.
   */
  /*private calculateCursorPosition(
    oldPosition: number,
    oldValue: string,
    newValue: string
  ): number {
    const fixedPrefixLength = 3; // "0(5"
    if (oldPosition <= fixedPrefixLength) {
      return fixedPrefixLength;
    }

    // Eski değer üzerinden, cursor öncesinde kaç rakam vardı?
    const digitsBeforeCursor = oldValue.slice(0, oldPosition).replace(/\D+/g, '').length;

    let newCursorPosition = fixedPrefixLength;
    let digitsCounted = 0;

    for (let i = fixedPrefixLength; i < newValue.length; i++) {
      if (/\d/.test(newValue[i]) || newValue[i] === '_') {
        digitsCounted++;
      }
      if (digitsCounted >= digitsBeforeCursor) {
        newCursorPosition = i + 1;
        break;
      }
    }

    return newCursorPosition;
  }*/

  /**
   * Girilen tuş rakam mı?
   */
  /*private isDigitInput(event: KeyboardEvent): boolean {
    return /\d/.test(event.key);
  }*/

  /**
   * CTRL, SHIFT, ALT vb. kombinasyonları
   */
  /*private isModifierKey(event: KeyboardEvent): boolean {
    const keyCode = event.keyCode;
    return (
      event.shiftKey === true ||
      keyCode === 35 || // End
      keyCode === 36 || // Home
      keyCode === 8 || // Backspace
      keyCode === 9 || // Tab
      keyCode === 13 || // Enter
      keyCode === 46 || // Delete
      (keyCode > 36 && keyCode < 41) || // Arrow keys
      ((event.ctrlKey === true || event.metaKey === true) &&
        (keyCode === 65 || keyCode === 67 || keyCode === 86 || keyCode === 88 || keyCode === 90))
    );
  }*/
}
