package com.example.Employee.service.impl;

import org.springframework.stereotype.Service;

import com.example.Employee.dto.EmployeeDto;
import com.example.Employee.entity.Employee;
import com.example.Employee.exception.ResourceNotFoundException;
import com.example.Employee.mapper.EmployeeMapper;
import com.example.Employee.repository.EmployeeRepository;
import com.example.Employee.service.EmployeeService;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private  EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
       Employee savedEmployee= employeeRepository.save(employee);
       return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
     Employee employee= employeeRepository .findById(employeeId)
      .orElseThrow(()->
     new ResourceNotFoundException("Employee not found" + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
       List<Employee> employees= employeeRepository.findAll();
        return  employees.stream().map((employee) ->EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());

        //return List.of();
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
      Employee employee=  employeeRepository.findById(employeeId).orElseThrow(() ->  new  ResourceNotFoundException("Employee is not exist" +employeeId) );

      employee.setFirstName(updatedEmployee.getFirstName());
      employee.setEmail(updatedEmployee.getEmail());
      employee.setLastName(updatedEmployee.getLastName());
     Employee updatedEmployeeObj= employeeRepository.save(employee);

      return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() ->  new  ResourceNotFoundException("Employee is not exist" +employeeId) );

        employeeRepository.deleteById(employeeId);

    }
}
