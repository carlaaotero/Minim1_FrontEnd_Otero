
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Activity } from '../../models/activity.model';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    private apiUrl = `${environment.apiUrl}/activities`;

    constructor(private http: HttpClient) {}

    // Obtenir totes les activitats
    getActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.apiUrl);
    }

    // Crear una nova activitat
    createActivity(activity: Activity): Observable<Activity> {
        return this.http.post<Activity>(this.apiUrl, activity);
    }

    // Actualitzar una activitat
    updateActivity(id: string, activity: Activity): Observable<Activity> {
        return this.http.put<Activity>(`${this.apiUrl}/${id}`, activity);
    }

    // Eliminar una activitat
    deleteActivity(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Buscar activitats per etiqueta
    getActivitiesByTag(tag: string): Observable<Activity[]> {
        return this.http.get<Activity[]>(`${this.apiUrl}/tag/${tag}`);
    }
}



