import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeInterface } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  newEmployee: EmployeeInterface = {
    name: '',
    email: '',
    phone: '',
    salary: 0,
  };
  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addEmployee() {
    this.employeesService.addEmployee(this.newEmployee).subscribe({
      //next then do what, the param will be brought here
      next: (employee) => {
        this.router.navigate(['/']); //router navigate
      },
    });
  }
}
