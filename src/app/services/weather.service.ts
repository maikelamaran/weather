import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, distinct, map, tap } from 'rxjs';
import { Clima } from '../interfaces/clima.interface';
import { Ciudad } from '../interfaces/ciudad.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  urlclima: string = '';
  // urlporcodigo : string="";
  key: string = '';
  urlfinal: string = '';
  urlclimaLat: string = '';
  urlciudad: string = '';
  urlclim: string = '';


  //buscar ciudades a filtrar
  //http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

  constructor(private http: HttpClient) {
    this.key = '3ca2b35786855c3dd3768dd75378e645';
    // this.urlclima = 'https://api.openweathermap.org/data/2.5/weather?q=';
    // this.urlclimaLat = 'https://api.openweathermap.org/data/2.5/weather?lat=';
    this.urlclim = 'https://api.openweathermap.org/data/2.5/weather?';
   
    this.urlciudad = 'http://api.openweathermap.org/geo/1.0/direct?';
  }

  getweatherbyCity(ciudad: string, unidad: string): Observable<any> {
    if (unidad === 'Fahrenheit') {
      this.urlfinal = `${this.urlclim}q=${ciudad}&appid=${this.key}&units=imperial`;
    }
    if (unidad === 'Kelvin') {
      this.urlfinal = `${this.urlclim}q=${ciudad}&appid=${this.key}`;
    }
    if (unidad === 'Celcius') {
      this.urlfinal = `${this.urlclim}q=${ciudad}&appid=${this.key}&units=metric`;
    }

    console.log(this.urlfinal);
    return this.http.get<Clima>(this.urlfinal);
  }
  getweatherbyLat(latitud: string, longitud: string): Observable<any> {
    this.urlfinal = `${this.urlclim}lat=${latitud}&lon=${longitud}&appid=${this.key}&units=metric`;

    console.log(this.urlfinal);
    return this.http.get<Clima>(this.urlfinal);
  }
  getciudades(ciudad: string) {
    const params = new HttpParams().set('fields', 'name');
    this.urlfinal = `${this.urlciudad}q=${ciudad}&limit=10&appid=${this.key}`;
    console.log( this.http.get<Ciudad[]>(this.urlfinal));
    return this.http.get<Ciudad[]>(this.urlfinal);
    
   
    }
   
  
  
}
