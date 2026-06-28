import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contract } from '../../models/Contract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private url = 'http://ems.local/api/contract/contracts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contract[]>              { return this.http.get<Contract[]>(this.url); }
  getById(id: number): Observable<Contract>     { return this.http.get<Contract>(`${this.url}/${id}`); }
  create(c: Contract): Observable<Contract>     { return this.http.post<Contract>(this.url, c); }
  update(id: number, c: Contract): Observable<Contract> { return this.http.put<Contract>(`${this.url}/${id}`, c); }
  delete(id: number): Observable<void>          { return this.http.delete<void>(`${this.url}/${id}`); }
}
