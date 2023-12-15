package com.example.backend.controller;

import com.example.backend.payload.Customer.CustomerDto;
import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.payload.Customer.ClientData;
import com.example.backend.payload.Diagnosis.ShortDiagnosisDto;
import com.example.backend.payload.Service.ServiceWithoutInvoices;
import com.example.backend.payload.Service.ShortServiceDto;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.service.CustomerService;
import com.example.backend.service.DiagnosisService;
import com.example.backend.service.RepairHistoryService;
import com.example.backend.service.RepairService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {
    private final CustomerService customerService;
    private final DiagnosisService diagnosisService;
    private final RepairService repairService;
    private final RepairHistoryService repairHistoryService;

    public CustomerController(CustomerRepository userRepository, CustomerService customerService, DiagnosisService diagnosisService, RepairService repairService, RepairHistoryService repairHistoryService) {
        this.customerService = customerService;
        this.diagnosisService = diagnosisService;
        this.repairService = repairService;
        this.repairHistoryService = repairHistoryService;
    }

    @PostMapping("/api/customers")
    public ResponseEntity<NewCustomerDto> createCustomer(@RequestBody NewCustomerDto newCustomerDto){

        return new ResponseEntity<>(customerService.createCustomer(newCustomerDto), HttpStatus.CREATED);
    }

    @GetMapping("/api/customers")
    public ResponseEntity<List<ShortCustomerDto>> getAllCustomers(){
        return new ResponseEntity<>(customerService.getAllCustomers(),HttpStatus.OK);

    }
    @GetMapping("/api/customers/{id}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Long id){
        return new ResponseEntity<>(customerService.getCustomerById(id),HttpStatus.OK);
    }
    @DeleteMapping("/api/customers/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id){
        return new ResponseEntity<>(customerService.deleteCustomer(id),HttpStatus.OK);
    }

    @PutMapping("/api/customers/{id}")
    public ResponseEntity<NewCustomerDto> updateCustomer(@RequestBody NewCustomerDto customerDto, @PathVariable Long id){
        return new ResponseEntity<>(customerService.updateCustomer(customerDto,id),HttpStatus.OK);
    }
    @PutMapping("/api/customers/{customerId}/reset")
    public ResponseEntity<String> resetCustomerAccessCode(@PathVariable long customerId){
        return new ResponseEntity<>(customerService.resetCustomerAccessCode(customerId),HttpStatus.OK);
    }

    //todo request param do zmiany
    @GetMapping("/client/customers/access")
    public ResponseEntity<ClientData> getCustomerDataByAccessCode(@RequestParam("accessCode") String accessCode){
        return new ResponseEntity<>(customerService.getCustomerDataByAccessCode(accessCode),HttpStatus.OK);
    }

    @GetMapping("/api/customers/{customerId}/diagnosis")
    public ResponseEntity<List<ShortDiagnosisDto>> getCustomerDiagnosesWithWaitingStatus(@PathVariable Long customerId){

        return new ResponseEntity<>(diagnosisService.getCustomerDiagnosesWithWaitingStatus(customerId), HttpStatus.OK);
    }
    @GetMapping("/api/customers/{customerId}/services")
    public ResponseEntity<List<ServiceWithoutInvoices>> getCustomerServices(@PathVariable Long customerId){

        return new ResponseEntity<>(repairService.getCustomerServices(customerId), HttpStatus.OK);
    }

}
