import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Clima } from '../../interfaces/clima.interface';
import { InputSearchComponent } from '../../components/input-search/input-search.component';
import { ClimaDetailsComponent } from '../../components/clima-details/clima-details.component';
import { MetodoBusquedaComponent } from '../../components/metodo-busqueda/metodo-busqueda.component';
import { InputSearchLatComponent } from '../../components/input-search-lat/input-search-lat.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Ciudad } from '../../interfaces/ciudad.interface';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    InputSearchComponent,
    ClimaDetailsComponent,
    MetodoBusquedaComponent,
    InputSearchLatComponent,
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  constructor(private servicioClima: WeatherService,private snackBar: MatSnackBar) {}
  miclima?: Clima;
  metodo: string = 'xciudad';
  
  mostrar_componente(metodo: string) {
    this.metodo = metodo;
    //xlatlong
    //xciudad
  }
  buscar(datos: { ciudad: string; unidad: string }) {
    this.servicioClima.getweatherbyCity(datos.ciudad, datos.unidad).subscribe({
      next: (clim: Clima | undefined) => {
        console.log(clim);
        this.miclima = clim;
      },
      error: (error) => {
        console.log(error);
        this.mostrarMensajeErrorCiudad();
      },
    });
  }
  buscarXlatitud(datos: { latitud: string; longitud: string }) {
    this.servicioClima
      .getweatherbyLat(datos.latitud, datos.longitud)
      .subscribe({
        next: (clim: Clima | undefined) => {
          console.log(clim);
          this.miclima = clim;
        },
        error: (error) => {
          console.log(error);
          this.mostrarMensajeErrorLat();
        },
      });
  }

  private mostrarMensajeErrorCiudad() {
    
    this.snackBar.open('Ups, algo salió mal revise que exista la ciudad', 'Cerrar', {//tengo que inyectar snackbar
      duration: 3000 
    });
  }
  private mostrarMensajeErrorLat() {
    
    this.snackBar.open('Ups, algo salió mal revise Latitud y Longitud', 'Cerrar', {//tengo que inyectar snackbar
      duration: 3000 
    });
  }

}
