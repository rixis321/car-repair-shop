package com.example.backend.service.impl;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.model.Car;
import com.example.backend.model.Customer;
import com.example.backend.payload.Car.CarDto;
import com.example.backend.payload.Car.NewCarDto;
import com.example.backend.payload.Car.ShortCarDto;
import com.example.backend.payload.mapper.CarMapper;
import com.example.backend.repository.CarInfoRepository;
import com.example.backend.repository.CarRepository;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.service.CarService;
import com.example.backend.validator.CarDataValidator;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {
    private final CarDataValidator carDataValidator;
    private final CustomerRepository customerRepository;
    private final CarRepository carRepository;
    private final CarInfoRepository carInfoRepository;
    private final ModelMapper modelMapper;
    private final CarMapper carMapper;

    public CarServiceImpl(CarDataValidator carDataValidator, CustomerRepository customerRepository, CarRepository carRepository, CarInfoRepository carInfoRepository, ModelMapper modelMapper, CarMapper carMapper) {
        this.carDataValidator = carDataValidator;
        this.customerRepository = customerRepository;
        this.carRepository = carRepository;
        this.carInfoRepository = carInfoRepository;
        this.modelMapper = modelMapper;
        this.carMapper = carMapper;
    }

    @Override
    public NewCarDto addCar(NewCarDto newCarDto, Long customerId) {
        Logger logger = LoggerFactory.getLogger(CarServiceImpl.class);
        try {
            carDataValidator.validateCarData(newCarDto);
            Customer customer = customerRepository.findById(customerId)
                    .orElseThrow(()-> new ResourceNotFoundException("Customer","id",customerId));
            if(carRepository.existsByRegistrationNumber(newCarDto.getRegistrationNumber())){
                throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"Registration number already exists in database");

            }if(carInfoRepository.existsByVinNumber(newCarDto.getCarInfoDto().getVinNumber())){
                throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"Vin number already exists in database");
            }

            Car car = carMapper.toCar(newCarDto);
            car.getCarInfo().setCar(car);
            car.setCustomer(customer);
            customer.getCars().add(car);
            customer = customerRepository.save(customer);
            return carMapper.toNewCarDto(car);
            //customer.getCars().add()

            }
        catch (CarRepairShopApiException | ValidationException e) {
            logger.error(e.getMessage());
            throw e;
        }
    }



    @Override
    public NewCarDto updateCar(NewCarDto newCarDto, Long customerId) {
        return null;
    }

    @Override
    public List<ShortCarDto> getAllCars() {
       return carRepository.findAll()
                .stream()
                .map((e)-> {
                   String name = e.getCustomer().getName();
                    String lastName = e.getCustomer().getLastname();
                    ShortCarDto shortCarDto = carMapper.toShortCarDto(e);
                    shortCarDto.setFullOwnerName(name+" "+lastName);
                    return shortCarDto;

                })
                .toList();
    }

    @Override
    public void deleteCar(Long carId) {

    }

    @Override
    public CarDto getCarById(Long carId) {
        return null;
    }
}
