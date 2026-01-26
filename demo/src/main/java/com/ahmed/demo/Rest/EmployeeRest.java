package com.ahmed.demo.Rest;

import com.ahmed.demo.Service.EmployeeService;
import com.ahmed.demo.entitiy.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tools.jackson.databind.json.JsonMapper;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class EmployeeRest {

    private EmployeeService employeeService;
    private JsonMapper jsonMapper;

    @Autowired
    public EmployeeRest(EmployeeService employeeService, JsonMapper jsonMapper) {
        this.employeeService = employeeService;
        this.jsonMapper = jsonMapper;
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/employees/{id}")
    public Employee getEmployee(@PathVariable int id) {
        return employeeService.getEmployeeById(id);
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        employee.setId(0);
        return employeeService.save(employee);
    }

    @PutMapping("/employees")
    public Employee updateEmployee(@RequestBody Employee employee) {
        return employeeService.save(employee);
    }

    @PatchMapping("/employees/{id}")
    public Employee updatePartEmployee(@RequestBody Map<String, Object> payload, @PathVariable int id) {

        Employee employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            throw new RuntimeException("No employee found");
        }

        if (payload.containsKey("id")) {
            throw new RuntimeException("we don't need the id ");
        }

        Employee employee1 = jsonMapper.updateValue(employee, payload);
        return employeeService.save(employee1);
    }

    @DeleteMapping("/employees/{id}")
    public void deleteEmployee(@PathVariable int id) {
        Employee employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            throw new RuntimeException("No employee found");
        }
        employeeService.deleteEmployee(id);
    }
}
