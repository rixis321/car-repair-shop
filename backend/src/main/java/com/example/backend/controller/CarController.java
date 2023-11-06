package com.example.backend.controller;

import com.example.backend.payload.Car.CarDto;
import com.example.backend.payload.Car.NewCarDto;
import com.example.backend.payload.Car.ShortCarDto;
import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Customer.ShortCustomerDto;
import com.example.backend.service.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/{customerId}/cars")
    public ResponseEntity<NewCarDto> addCar(@RequestBody NewCarDto newCarDto, @PathVariable Long customerId){

        return new ResponseEntity<>(carService.addCar(newCarDto,customerId), HttpStatus.CREATED);
    }

    @GetMapping("/cars")
    public ResponseEntity<List<ShortCarDto>> getAllCars(){
        return new ResponseEntity<>(carService.getAllCars(),HttpStatus.OK);

    }

    @DeleteMapping("/cars/{carId}")
    public ResponseEntity<String> deleteCar(@PathVariable Long carId){
        return new ResponseEntity<>(carService.deleteCar(carId),HttpStatus.OK);
    }
    @GetMapping("/cars/{carId}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long carId){
        return new ResponseEntity<>(carService.getCarById(carId),HttpStatus.OK);
    }
}
