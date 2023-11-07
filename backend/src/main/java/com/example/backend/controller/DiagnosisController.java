package com.example.backend.controller;

import com.example.backend.payload.Customer.NewCustomerDto;
import com.example.backend.payload.Diagnosis.DiagnosisDto;
import com.example.backend.payload.Diagnosis.NewDiagnosisDto;
import com.example.backend.payload.Diagnosis.ShortDiagnosisDto;
import com.example.backend.service.DiagnosisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping("/diagnosis")
    public ResponseEntity<List<ShortDiagnosisDto>> getAllDiagnosis(){

        return new ResponseEntity<>(diagnosisService.getAllDiagnosis(), HttpStatus.OK);
    }
    @GetMapping("/diagnosis/{diagnosisId}")
    public ResponseEntity<DiagnosisDto> getDiagnosisById(@PathVariable Long diagnosisId){

        return new ResponseEntity<>(diagnosisService.getDiagnosisById(diagnosisId), HttpStatus.OK);
    }

}
