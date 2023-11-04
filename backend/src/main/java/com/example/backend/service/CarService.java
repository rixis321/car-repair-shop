package com.example.backend.service;

import com.example.backend.payload.Car.CarDto;
import com.example.backend.payload.Car.NewCarDto;
import com.example.backend.payload.Car.ShortCarDto;

import java.util.List;

public interface CarService {

    NewCarDto addCar(NewCarDto newCarDto, Long customerId);

    NewCarDto updateCar(NewCarDto newCarDto, Long customerId);

    List<ShortCarDto> getAllCars();

    String deleteCar(Long carId);

    CarDto getCarById(Long carId);
}
