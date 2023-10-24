import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ModelFormConfig, initalModelFormConfig } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ModelFormsService {
  private http = inject(HttpClient);
  modelFormConfig = initalModelFormConfig;

  loadMetadata(): Observable<ModelFormConfig> {
    const url = './assets/model-forms-config.json';

    return this.http.get<ModelFormConfig>(url).pipe(
      tap(config => this.modelFormConfig = config)
    );
  }
}
