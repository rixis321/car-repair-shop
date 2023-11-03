package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.Customer;
import com.example.backend.payload.Customer.CustomerDto;
import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.payload.mapper.CustomerMapper;
import com.example.backend.repository.UserAddressRepository;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.service.CustomerService;
import com.example.backend.utils.AccessCodeGenerator;
import com.example.backend.validator.UserDataValidator;
import org.modelmapper.ModelMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final UserAddressRepository userInfoRepository;

    private final CustomerMapper customerMapper;

    private final UserDataValidator userDataValidator;

    public CustomerServiceImpl( CustomerRepository customerRepository, UserAddressRepository userInfoRepository, CustomerMapper customerMapper, UserDataValidator userDataValidator) {
        this.customerRepository = customerRepository;
        this.userInfoRepository = userInfoRepository;
        this.customerMapper = customerMapper;
        this.userDataValidator = userDataValidator;
    }


    @Override
    public CustomerDto getCustomerById(Long id) {
       Customer customer = customerRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("customer","id",id));

       return customerMapper.mapToCustomerDto(customer);
    }

    @Override
    public CustomerDto getCustomerByAccessCode(String accessCode) {
        Customer customer = customerRepository.findCustomerByAccessCode(accessCode).orElseThrow(()-> new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"Invalid code"));

        return customerMapper.mapToCustomerDto(customer);
    }

    @Override
    public List<ShortCustomerDto> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map(customerMapper::mapToShortCustomerDto).toList();
    }

    @Override
    public NewCustomerDto updateCustomer(NewCustomerDto customerDto, Long customerId) {
        Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
        try{
            Customer customer = customerRepository.findById(customerId)
                    .orElseThrow(()-> new ResourceNotFoundException("Customer","id",customerId));
            Customer updatedCustomer = new Customer();
            userDataValidator.validateCustomerUpdatedData(customerDto);
            if(!customerDto.getPhone().equals(customer.getPhone())){
                userDataValidator.validatePhoneNumber(customerDto.getPhone(),"customer");
            }
            updatedCustomer = customerMapper.mapToCustomer(customerDto);

            updatedCustomer.getUserAddress().setId(customer.getUserAddress().getId());
            updatedCustomer.getUserAddress().setCustomer(customer);
            updatedCustomer.setCars(customer.getCars());
            updatedCustomer.setId(customer.getId());
            updatedCustomer.setAccessCode(customer.getAccessCode());

            updatedCustomer = customerRepository.save(updatedCustomer);
            return customerMapper.mapToNewCustomerDto(updatedCustomer);

        }catch (CarRepairShopApiException | ValidationException e){
            logger.error(e.getMessage());
            throw e;
        }
    }


    @Override
    public String deleteCustomer(Long customerId) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(()-> new ResourceNotFoundException("Customer","id",customerId));

        customerRepository.delete(customer);

        return "Customer deleted successfully";

    }
    @Override
    public NewCustomerDto createCustomer(NewCustomerDto customerDto) {
        Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);
        try {
            userDataValidator.validateCustomerData(customerDto);
            Customer customer = customerMapper.mapToCustomer(customerDto);
            customer.getUserAddress().setCustomer(customer);
            customer.setAccessCode(AccessCodeGenerator.generateCode());
            customer = customerRepository.save(customer);
            return customerMapper.mapToNewCustomerDto(customer);
        } catch (CarRepairShopApiException | ValidationException e) {
            logger.error(e.getMessage());
            throw e;
        }
    }

}
