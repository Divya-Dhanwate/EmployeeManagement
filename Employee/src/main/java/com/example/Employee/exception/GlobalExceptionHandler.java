package com.example.Employee.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
@RestControllerAdvice
public class GlobalExceptionHandler {
@ExceptionHandler(EmailAlreadyExistsException.class)
public ResponseEntity<String> handleEmailAlreadyExistsException(
        EmailAlreadyExistsException ex) {

    System.out.println("GlobalExceptionHandler called");

    return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
}
}
