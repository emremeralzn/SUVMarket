import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-car-value-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-value-found.html',
  styleUrl: './car-value-found.scss',
})
export class CarValueFound {
  steps: string[] = ['Marka', 'Model', 'Model Yılı', 'Gövde', 'Makyaj', 'Koltuk', 'Motor', 'Çekiş Tipi', 'Vites', 'Donanım', 'Kilometre'];
  
  currentStepIndex: number = 0; 
  selectedBrand: string = '';
  selectedModel: string = '';
  selectedYear: string = '';

  // Veriyi iç içe dizi (Nested) yapısında tutuyoruz
  carData: any = {
  'Audi': {
    'A3': ['2024', '2023', '2022', '2021', '2020'],
    'A4': ['2023', '2022', '2021', '2019', '2018'],
    'Q7': ['2024', '2022', '2020'],
    'A6': ['2024', '2023', '2022', '2021'],
    'Q5': ['2024', '2023', '2022']
  },
  'BMW': {
    '3 Serisi': ['2023', '2022', '2021'],
    '5 Serisi': ['2024', '2023', '2020'],
    'X5': ['2024', '2021'],
    'X3': ['2024', '2023', '2022'],
    '1 Serisi': ['2023', '2022', '2021']
  },
  'Mercedes': {
    'C Serisi': ['2024', '2023', '2022'],
    'E Serisi': ['2023', '2021'],
    'S Serisi': ['2024', '2023'],
    'GLC': ['2024', '2022'],
    'A Serisi': ['2023', '2022', '2021']
  },
  'Volkswagen': {
    'Golf': ['2024', '2023', '2022', '2021'],
    'Passat': ['2023', '2022', '2021'],
    'Tiguan': ['2024', '2023'],
    'Polo': ['2023', '2022', '2021']
  },
  'Toyota': {
    'Corolla': ['2024', '2023', '2022', '2021'],
    'Camry': ['2023', '2022'],
    'RAV4': ['2024', '2023'],
    'Yaris': ['2023', '2022', '2021']
  },
  'Honda': {
    'Civic': ['2024', '2023', '2022', '2021'],
    'Accord': ['2023', '2022'],
    'CR-V': ['2024', '2023'],
    'HR-V': ['2023', '2022']
  },
  'Ford': {
    'Focus': ['2023', '2022', '2021'],
    'Fiesta': ['2022', '2021', '2020'],
    'Kuga': ['2024', '2023'],
    'Puma': ['2023', '2022']
  },
  'Hyundai': {
    'i20': ['2024', '2023', '2022'],
    'i30': ['2023', '2022', '2021'],
    'Tucson': ['2024', '2023'],
    'Elantra': ['2023', '2022']
  },
  'Kia': {
    'Ceed': ['2023', '2022'],
    'Sportage': ['2024', '2023'],
    'Rio': ['2022', '2021'],
    'Sorento': ['2024', '2023']
  },
  'Peugeot': {
    '208': ['2023', '2022', '2021'],
    '308': ['2024', '2023'],
    '3008': ['2024', '2023', '2022'],
    '5008': ['2023', '2022']
  },
  'Renault': {
    'Clio': ['2024', '2023', '2022'],
    'Megane': ['2023', '2022', '2021'],
    'Captur': ['2024', '2023'],
    'Talisman': ['2022', '2021']
  },
  'Tesla': {
    'Model S': ['2024', '2023', '2022'],
    'Model 3': ['2024', '2023', '2022', '2021'],
    'Model X': ['2024', '2023'],
    'Model Y': ['2024', '2023', '2022']
  }
};

  // Markaları al (Object keys: Audi, BMW...)
  get brands(): string[] {
    return Object.keys(this.carData);
  }

  // Seçilen markaya göre modelleri al (A3, A4...)
  get filteredModels(): string[] {
    return this.selectedBrand ? Object.keys(this.carData[this.selectedBrand]) : [];
  }

  // Seçilen marka ve modele göre yılları al
  get filteredYears(): string[] {
    if (this.selectedBrand && this.selectedModel) {
      return this.carData[this.selectedBrand][this.selectedModel];
    }
    return [];
  }

  selectBrand(brand: string) {
    this.selectedBrand = brand;
    this.currentStepIndex = 1; 
  }

  selectModel(model: string) {
    this.selectedModel = model;
    this.currentStepIndex = 2; 
  }

  selectYear(year: string) {
    this.selectedYear = year;
    this.currentStepIndex = 3; 
  }

  goToStep(index: number) {
    if (index <= this.currentStepIndex) {
      this.currentStepIndex = index;
      // Geri dönüldüğünde alt seçimleri temizle
      if (index < 3) this.selectedYear = '';
      if (index < 2) this.selectedModel = '';
      if (index < 1) this.selectedBrand = '';
    }
  }
}