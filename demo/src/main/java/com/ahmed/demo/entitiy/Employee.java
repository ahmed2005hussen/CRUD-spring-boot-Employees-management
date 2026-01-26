package com.ahmed.demo.entitiy;

import jakarta.persistence.*;

@Entity
@Table(name = "employee")
public class Employee {

    // Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "salary")
    private double salary;

    @Column(name = "department")
    private String department;

    // Default non-parameterize constructor for jakarta

    public Employee() {
    }

    public Employee(String email, String firstName, double salary, String department, String lastName) {
        this.email = email;
        this.firstName = firstName;
        this.salary = salary;
        this.department = department;
        this.lastName = lastName;
    }

    // Getters and setters for convert from java object to json and vie verse
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
