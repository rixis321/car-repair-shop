package com.example.backend.controller;

import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Diagnosis.NewDiagnosisDto;
import com.example.backend.service.DiagnosisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DiagnosisController {

    private final DiagnosisService diagnosisService;

    public DiagnosisController(DiagnosisService diagnosisService) {
        this.diagnosisService = diagnosisService;
    }

    @PostMapping("/diagnosis")
    public ResponseEntity<NewDiagnosisDto> addDiagnosis(@RequestBody NewDiagnosisDto newDiagnosisDto){

        return new ResponseEntity<>(diagnosisService.addDiagnosis(newDiagnosisDto), HttpStatus.CREATED);
    }

}
