import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../../models/department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

private url = 'http://localhost:8090/api/staff/departements';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Department[]>          { return this.http.get<Department[]>(this.url); }
  getById(id: number): Observable<Department> { return this.http.get<Department>(`${this.url}/${id}`); }
  create(d: Department): Observable<Department> { return this.http.post<Department>(this.url, d); }
  update(id: number, d: Department): Observable<Department> { return this.http.put<Department>(`${this.url}/${id}`, d); }
  delete(id: number): Observable<void>        { return this.http.delete<void>(`${this.url}/${id}`); }




}
