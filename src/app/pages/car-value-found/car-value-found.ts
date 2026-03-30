import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-car-value-found',
  imports: [NgFor],
  templateUrl: './car-value-found.html',
  styleUrl: './car-value-found.scss',
})
export class CarValueFound {
brands: string[] = [
  'Audi', 'BMW', 'Mercedes', 'Toyota', 'Honda',
  'Ford', 'Renault', 'Fiat', 'Hyundai', 'Kia',
  'Peugeot', 'Opel', 'Volkswagen', 'Skoda', 'Seat',
  'Citroen', 'Dacia', 'Nissan', 'Mazda', 'Mitsubishi',
  'Subaru', 'Suzuki', 'Volvo', 'Jaguar', 'Land Rover',
  'Mini', 'Porsche', 'Ferrari', 'Lamborghini', 'Maserati',
  'Alfa Romeo', 'Jeep', 'Chrysler', 'Dodge', 'Tesla',
  'BYD', 'Chery', 'Geely', 'Great Wall', 'MG',
  'DS Automobiles', 'Cupra', 'Infiniti', 'Acura', 'Genesis',
  'Cadillac', 'Lincoln', 'Buick', 'Saab', 'Smart'
];
}
