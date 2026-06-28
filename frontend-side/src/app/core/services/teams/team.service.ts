import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../models/Team';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

private url = 'http://ems.local/api/staff/teams';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Team[]>          { return this.http.get<Team[]>(this.url); }
  getById(id: number): Observable<Team> { return this.http.get<Team>(`${this.url}/${id}`); }
  create(t: Team): Observable<Team>     { return this.http.post<Team>(this.url, t); }
  update(id: number, t: Team): Observable<Team> { return this.http.put<Team>(`${this.url}/${id}`, t); }
  delete(id: number): Observable<void>  { return this.http.delete<void>(`${this.url}/${id}`); }

}
