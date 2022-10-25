using FullStack.API.Data;
using FullStack.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly FullStackDbContext _fullStackDbContext;

        public EmployeesController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _fullStackDbContext.Employees.ToListAsync();

            return Ok(employees);  
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employeeRequest)
        {
            await _fullStackDbContext.Employees.AddAsync(employeeRequest);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(employeeRequest);
        }

        [HttpGet("{id}")]
        public async Task <IActionResult> GetEmployee(int id)
        {
            var employee = await _fullStackDbContext.Employees.FirstOrDefaultAsync(x => x.Id.Equals(id));
            
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            var dbEmployee = await _fullStackDbContext.Employees.FindAsync(id);

            if (dbEmployee == null)
            {
                return BadRequest("Employee not found");
            }

            dbEmployee.name = employee.name;
            dbEmployee.email = employee.email; 
            dbEmployee.phone = employee.phone;
            dbEmployee.Salary = employee.Salary;

            await _fullStackDbContext.SaveChangesAsync();

            return Ok(await _fullStackDbContext.Employees.ToListAsync());
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> deleteEmployee(int id)
        {
            var dbEmployee = await _fullStackDbContext.Employees.FindAsync(id);

            if (dbEmployee == null)
            {
                return BadRequest("Employee not found");
            }

            _fullStackDbContext.Remove(dbEmployee);
            await _fullStackDbContext.SaveChangesAsync();

            return Ok(await _fullStackDbContext.Employees.ToListAsync());
        }
    }
}
