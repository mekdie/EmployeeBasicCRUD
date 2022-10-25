import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeInterface } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  editEmployee: EmployeeInterface = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    salary: 0,
  };
  employeeId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        const id = Number(response.get('id'));
        if (id) {
          // call api
          this.employeeService.getEmployee(id).subscribe({
            next: (response) => {
              this.editEmployee = response;
              this.employeeId = Number(response.id);
            },
          });
        }
      },
    });
  }

  updateEmployee() {
    this.employeeService
      .updateEmployee(Number(this.editEmployee.id), this.editEmployee)
      .subscribe({
        next: (emp) => {
          this.router.navigate(['employees']);
        },
      });
  }

  deleteEmployee(id: number) {
    this.employeeService.delete(id).subscribe({
      next: (resp) => {
        this.router.navigate(['employees']);
      },
    });
  }
}
