package com.ahmed.demo.Service;

import com.ahmed.demo.entitiy.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    Employee getEmployeeById(int id);

    // for add and edit
    Employee save (Employee employee);
    void deleteEmployee(int id);
}
