package com.example.Employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Employee.entity.Employee;
import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {
boolean existsByEmail(String email);

List<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
  String firstName, String lastName, String email  
);

}
