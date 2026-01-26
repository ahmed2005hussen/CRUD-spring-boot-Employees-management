package com.ahmed.demo.DAO;

import com.ahmed.demo.entitiy.Employee;

import java.util.List;

public interface EmployeeDAO {

    List<Employee> getAllEmployees();
    Employee getEmployeeById(int id);

    // for add and edit
    Employee save (Employee employee);
    void deleteEmployee(int id);
}
