package com.example.backend.controller;

import com.example.backend.model.constants.ServiceStatus;
import com.example.backend.payload.Service.ServiceDto;
import com.example.backend.payload.Service.ShortServiceDto;
import com.example.backend.service.RepairService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ServiceController {
    private final RepairService repairService;

    public ServiceController(RepairService repairService) {
        this.repairService = repairService;
    }


    @PostMapping("/services/{employeeId}/{diagnosisId}")
    public ResponseEntity<ShortServiceDto>  addService(@RequestBody ShortServiceDto shortServiceDto,
                                                       @PathVariable Long employeeId,
                                                       @PathVariable Long diagnosisId){

        return new ResponseEntity<>(repairService.addService(shortServiceDto,employeeId,diagnosisId), HttpStatus.CREATED);
    }
    @PutMapping("/services/{serviceId}")
    public ResponseEntity<ShortServiceDto>  updateService(@RequestBody ShortServiceDto shortServiceDto,
                                                       @PathVariable Long serviceId){

        return new ResponseEntity<>(repairService.updateService(shortServiceDto,serviceId), HttpStatus.OK);
    }
    @GetMapping("/services/byStatus")
    public ResponseEntity<List<ShortServiceDto>>  getServicesByStatus(@RequestParam ServiceStatus status){

        return new ResponseEntity<>(repairService.getServicesByStatus(status), HttpStatus.OK);
    }
    @GetMapping("/services")
    public ResponseEntity<List<ShortServiceDto>>  getAllServices(){

        return new ResponseEntity<>(repairService.getAllServices(), HttpStatus.OK);
    }
    @GetMapping("/services/{serviceId}")
    public ResponseEntity<ServiceDto> getServiceById(@PathVariable Long serviceId){
        return new ResponseEntity<>(repairService.getServiceById(serviceId),HttpStatus.OK);
    }
    @PutMapping("/services/{serviceId}/status")
    public ResponseEntity<ShortServiceDto> updateServiceStatus(@PathVariable Long serviceId,@RequestParam ServiceStatus status){
        return new ResponseEntity<>(repairService.updateServiceStatus(serviceId,status),HttpStatus.OK);
    }
}
