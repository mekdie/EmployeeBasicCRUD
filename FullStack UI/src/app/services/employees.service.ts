import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeInterface } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<EmployeeInterface[]> {
    return this.http.get<EmployeeInterface[]>(
      this.baseApiUrl + '/api/employees'
    );
  }

  addEmployee(newEmployee: EmployeeInterface): Observable<EmployeeInterface> {
    return this.http.post<EmployeeInterface>(
      this.baseApiUrl + '/api/employees',
      newEmployee
    );
  }

  getEmployee(id: number): Observable<EmployeeInterface> {
    return this.http.get<EmployeeInterface>(
      this.baseApiUrl + '/api/employees/' + id
    );
  }

  updateEmployee(
    id: number,
    updateEmployee: EmployeeInterface
  ): Observable<EmployeeInterface> {
    return this.http.put<EmployeeInterface>(
      this.baseApiUrl + '/api/employees/' + id,
      updateEmployee
    );
  }

  delete(id: number): Observable<EmployeeInterface> {
    return this.http.delete<EmployeeInterface>(
      this.baseApiUrl + '/api/employees/delete/' + id
    );
  }
}
