package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.Customer;
import com.example.backend.payload.Customer.CustomerDto;
import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.repository.UserAddressRepository;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.service.CustomerService;
import com.example.backend.utils.AccessCodeGenerator;
import com.example.backend.utils.UserDataValidator;
import org.modelmapper.ModelMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final ModelMapper modelMapper;
    private final CustomerRepository customerRepository;
    private final UserAddressRepository userInfoRepository;

    private final UserDataValidator userDataValidator;

    public CustomerServiceImpl(ModelMapper modelMapper, CustomerRepository customerRepository, UserAddressRepository userInfoRepository, UserDataValidator userDataValidator) {
        this.modelMapper = modelMapper;
        this.customerRepository = customerRepository;
        this.userInfoRepository = userInfoRepository;
        this.userDataValidator = userDataValidator;
    }


    @Override
    public CustomerDto getCustomerById(Long id) {
       Customer customer = customerRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("customer","id",id));

       return modelMapper.map(customer, CustomerDto.class);
    }

    @Override
    public List<ShortCustomerDto> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map((customer)->modelMapper.map(customer, ShortCustomerDto.class)).toList();
    }

    @Override
    public NewCustomerDto updateCustomer(NewCustomerDto customerDto, Long customerId) {

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(()-> new ResourceNotFoundException("Customer","id",customerId));

        //TODO jakas validacja here do przerobienia

        customer = customerRepository.save(modelMapper.map(customerDto, Customer.class));
        return modelMapper.map(customer,NewCustomerDto.class);
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
            Customer customer = modelMapper.map(customerDto, Customer.class);
            customer.getUserAddress().setCustomer(customer);
            customer.setAccessCode(AccessCodeGenerator.generateCode());
            customer = customerRepository.save(customer);
            return modelMapper.map(customer, NewCustomerDto.class);
        } catch (CarRepairShopApiException e) {
            logger.error(e.getMessage());
            throw new CarRepairShopApiException(e.getStatus(),e.getMessage());
        } catch (ValidationException e) {
            logger.error(e.getMessage());
            throw new ValidationException(e.getMessage());
        }
    }

}
