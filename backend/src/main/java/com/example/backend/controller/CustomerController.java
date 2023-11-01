package com.example.backend.controller;

import com.example.backend.payload.Customer.CustomerDto;
import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerRepository userRepository, CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/customers")
    public ResponseEntity<NewCustomerDto> createCustomer(@RequestBody NewCustomerDto newCustomerDto){

        return new ResponseEntity<>(customerService.createCustomer(newCustomerDto), HttpStatus.CREATED);
    }

    @GetMapping("/customers")
    public ResponseEntity<List<ShortCustomerDto>> getAllCustomers(){
        return new ResponseEntity<>(customerService.getAllCustomers(),HttpStatus.OK);

    }
    @GetMapping("/customers/{id}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Long id){
        return new ResponseEntity<>(customerService.getCustomerById(id),HttpStatus.OK);
    }
    @DeleteMapping("/customers/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id){
        return new ResponseEntity<>(customerService.deleteCustomer(id),HttpStatus.OK);
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<NewCustomerDto> updateCustomer(@RequestBody NewCustomerDto customerDto, @PathVariable Long id){
        return new ResponseEntity<>(customerService.updateCustomer(customerDto,id),HttpStatus.OK);
    }

}
