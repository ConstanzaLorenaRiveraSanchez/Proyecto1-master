// apis.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClimaModel } from '../models/clima.model';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient) { }

  // Método para obtener el clima con coordenadas dinámicas
  public obtenerClima(longitud: string, latitud: string): Promise<ClimaModel> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;

    return new Promise((resolve, reject) => {
      this.http.get<ClimaModel>(url).subscribe(
        (data: ClimaModel) => {
          resolve(data);
        },
        (error) => {
          reject(error); 
        }
      );
    });
  }
}
