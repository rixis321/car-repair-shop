package com.example.backend.controller;

import com.example.backend.model.constants.ClientApproval;
import com.example.backend.payload.Diagnosis.*;
import com.example.backend.service.DiagnosisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DiagnosisController {

    private final DiagnosisService diagnosisService;

    public DiagnosisController(DiagnosisService diagnosisService) {
        this.diagnosisService = diagnosisService;
    }

    @PostMapping("/api/diagnosis")
    public ResponseEntity<NewDiagnosisDto> addDiagnosis(@RequestBody NewDiagnosisDto newDiagnosisDto){

        return new ResponseEntity<>(diagnosisService.addDiagnosis(newDiagnosisDto), HttpStatus.CREATED);
    }
    @GetMapping("/api/diagnosis")
    public ResponseEntity<List<DiagnosisWithEmployee>> getAllDiagnosis(){

        return new ResponseEntity<>(diagnosisService.getAllDiagnosis(), HttpStatus.OK);
    }

    @GetMapping("/api/diagnosis/services/receptionist")
    public ResponseEntity<DiagnosisWithServices> getDiagnosisWithServices(){

        return new ResponseEntity<>(diagnosisService.getDiagnosisWithServices(), HttpStatus.OK);
    }

    @GetMapping("/api/diagnosis/status")
    public ResponseEntity<List<DiagnosisDto>> getAllDiagnosisByStatus(@RequestParam ClientApproval status){

        return new ResponseEntity<>(diagnosisService.getAllDiagnosisByStatus(status), HttpStatus.OK);
    }
    @GetMapping("/api/diagnosis/{diagnosisId}")
    public ResponseEntity<DiagnosisDto> getDiagnosisById(@PathVariable Long diagnosisId){

        return new ResponseEntity<>(diagnosisService.getDiagnosisById(diagnosisId), HttpStatus.OK);
    }
    @DeleteMapping("/api/diagnosis/{diagnosisId}")
    public ResponseEntity<String> deleteDiagnosisById(@PathVariable Long diagnosisId){

        return new ResponseEntity<>(diagnosisService.deleteDiagnosisById(diagnosisId), HttpStatus.OK);
    }
    @PutMapping("/api/diagnosis/{diagnosisId}")
    public ResponseEntity<UpdatedDiagnosisDto> updateDiagnosis(@RequestBody UpdatedDiagnosisDto updatedDiagnosisDto,
                                                               @PathVariable Long diagnosisId){

        return new ResponseEntity<>(diagnosisService.updateDiagnosis(updatedDiagnosisDto,diagnosisId), HttpStatus.OK);
    }
    @PutMapping("/api/diagnosis/{diagnosisId}/status")
    public ResponseEntity<UpdatedDiagnosisDto> updateDiagnosisStatus(@PathVariable Long diagnosisId,
                                                               @RequestParam ClientApproval status){

        return new ResponseEntity<>(diagnosisService.updateDiagnosisStatus(diagnosisId,status), HttpStatus.OK);
    }

    @PutMapping("/client/diagnosis/{diagnosisId}/status")
    public ResponseEntity<UpdatedDiagnosisDto> updateCustomerDiagnosisStatus(@PathVariable Long diagnosisId,
                                                                     @RequestParam ClientApproval status,
                                                                             @RequestParam String accessCode){

        return new ResponseEntity<>(diagnosisService.updateCustomerDiagnosisStatus(diagnosisId,status,accessCode), HttpStatus.OK);
    }

}
