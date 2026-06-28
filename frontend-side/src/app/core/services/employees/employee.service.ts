import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../models/Employee';
import { Observable } from 'rxjs';
import { EmployeeRequest } from '../../models/EmployeeRequest';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'http://ems.local/api/staff/employees';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]>                      { return this.http.get<Employee[]>(this.url); }
  getById(id: number): Observable<Employee>             { return this.http.get<Employee>(`${this.url}/${id}`); }
  create(e: EmployeeRequest): Observable<Employee>             { return this.http.post<Employee>(this.url, e); }
  update(id: number, e: Employee): Observable<Employee> { return this.http.put<Employee>(`${this.url}/${id}`, e); }
  delete(id: number): Observable<void>                  { return this.http.delete<void>(`${this.url}/${id}`); }

}
