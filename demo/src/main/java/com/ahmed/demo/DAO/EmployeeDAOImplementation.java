package com.ahmed.demo.DAO;

import com.ahmed.demo.entitiy.Employee;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeDAOImplementation implements EmployeeDAO {

    private EntityManager entityManager;

    @Autowired
    public EmployeeDAOImplementation(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Employee> getAllEmployees() {

        TypedQuery<Employee> query = entityManager.createQuery("from Employee", Employee.class);

        List<Employee> result = query.getResultList();

        if (result.isEmpty()) {
            throw new RuntimeException("No employees found");
        }

        return result;
    }

    @Override
    public Employee getEmployeeById(int id) {

        Employee employee = entityManager.find(Employee.class, id);

        if (employee == null) {
            throw new RuntimeException("No employee with id " + id);
        }
        return employee;
    }

    @Override
    public Employee save(Employee employee) {
        return entityManager.merge(employee);
    }

    @Override
    public void deleteEmployee(int id) {

        Employee employee = entityManager.find(Employee.class, id);
        if (employee == null) {
            throw new RuntimeException("No employee with id " + id);
        }
        entityManager.remove(employee);
    }
}
