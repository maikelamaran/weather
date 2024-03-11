import { Component, Input, OnInit, SimpleChanges,OnChanges } from '@angular/core';
import { Clima } from '../../interfaces/clima.interface';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-clima-details',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './clima-details.component.html',
  styleUrl: './clima-details.component.css',
})
export class ClimaDetailsComponent implements OnInit,OnChanges {
  @Input() clima?: Clima;
  
  imageUrl: string = 'https://openweathermap.org/img/wn/';
  finalimagURL: string = '@2x.png';
  dataSource: MatTableDataSource<Clima> = new MatTableDataSource<Clima>(); // Asegúrate de tipar MatTableDataSource con Clima

  constructor() { }

  ngOnInit(): void {
    if (this.clima) {
      this.dataSource.data = [this.clima];
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clima'] && changes['clima'].currentValue) {
      this.dataSource.data = [changes['clima'].currentValue];
    }
  }
}
