package com.example.Employee.mapper;

import com.example.Employee.dto.EmployeeDto;
import com.example.Employee.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail());
    }

    public static Employee mapToEmployee(EmployeeDto dto) {
        return new Employee(
                dto.getId(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getEmail()
        );
    }

}


