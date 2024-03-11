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
  //zip
  //https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}

  //buscar ciudades a filtrar
  //http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

  constructor(private http: HttpClient) {
    this.key = '3ca2b35786855c3dd3768dd75378e645';
    this.urlclima = 'https://api.openweathermap.org/data/2.5/weather?q=';
    this.urlclimaLat = 'https://api.openweathermap.org/data/2.5/weather?lat=';
    // this.urlporcodigo="https://api.openweathermap.org/data/2.5/weather?id=2172797&appid={API key}";
    this.urlciudad = 'http://api.openweathermap.org/geo/1.0/direct?';
  }

  getweatherbyCity(ciudad: string, unidad: string): Observable<any> {
    if (unidad === 'Fahrenheit') {
      this.urlfinal = `${this.urlclima}${ciudad}&appid=${this.key}&units=imperial`;
    }
    if (unidad === 'Kelvin') {
      this.urlfinal = `${this.urlclima}${ciudad}&appid=${this.key}`;
    }
    if (unidad === 'Celcius') {
      this.urlfinal = `${this.urlclima}${ciudad}&appid=${this.key}&units=metric`;
    }

    console.log(this.urlfinal);
    return this.http.get<Clima>(this.urlfinal);
  }
  getweatherbyLat(latitud: string, longitud: string): Observable<any> {
    this.urlfinal = `${this.urlclimaLat}${latitud}&lon=${longitud}&appid=${this.key}&units=metric`;

    console.log(this.urlfinal);
    return this.http.get<Clima>(this.urlfinal);
  }
  getciudades(ciudad: string) {
    const params = new HttpParams().set('fields', 'name');
    this.urlfinal = `${this.urlciudad}q=${ciudad}&limit=5&appid=${this.key}`;
    console.log( this.http.get<Ciudad[]>(this.urlfinal));
    return this.http.get<Ciudad[]>(this.urlfinal);
    
   
    }
   
  
  
}
