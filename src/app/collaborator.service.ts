import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborator } from './collaborator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCollaborators(): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(`${this.apiServerUrl}/collaborator/all`);
  }

  public addCollaborator(collaborator: Collaborator): Observable<Collaborator> {
    return this.http.post<Collaborator>(`${this.apiServerUrl}/collaborator/add`, collaborator);
  }

  public updateCollaborator(collaborator: Collaborator): Observable<Collaborator> {
    return this.http.put<Collaborator>(`${this.apiServerUrl}/collaborator/update`, collaborator);
  }

  public deleteCollaborator(collaboratorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/collaborator/delete/${collaboratorId}`);
  }
}
