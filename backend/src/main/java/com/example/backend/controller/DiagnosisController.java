package com.example.backend.controller;

import com.example.backend.model.constants.ClientApproval;
import com.example.backend.payload.Diagnosis.*;
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
    public ResponseEntity<List<DiagnosisWithEmployee>> getAllDiagnosis(){

        return new ResponseEntity<>(diagnosisService.getAllDiagnosis(), HttpStatus.OK);
    }

    @GetMapping("/diagnosis/status")
    public ResponseEntity<List<DiagnosisDto>> getAllDiagnosisByStatus(@RequestParam ClientApproval status){

        return new ResponseEntity<>(diagnosisService.getAllDiagnosisByStatus(status), HttpStatus.OK);
    }
    @GetMapping("/diagnosis/{diagnosisId}")
    public ResponseEntity<DiagnosisDto> getDiagnosisById(@PathVariable Long diagnosisId){

        return new ResponseEntity<>(diagnosisService.getDiagnosisById(diagnosisId), HttpStatus.OK);
    }
    @DeleteMapping("/diagnosis/{diagnosisId}")
    public ResponseEntity<String> deleteDiagnosisById(@PathVariable Long diagnosisId){

        return new ResponseEntity<>(diagnosisService.deleteDiagnosisById(diagnosisId), HttpStatus.OK);
    }
    @PutMapping("/diagnosis/{diagnosisId}")
    public ResponseEntity<UpdatedDiagnosisDto> updateDiagnosis(@RequestBody UpdatedDiagnosisDto updatedDiagnosisDto,
                                                               @PathVariable Long diagnosisId){

        return new ResponseEntity<>(diagnosisService.updateDiagnosis(updatedDiagnosisDto,diagnosisId), HttpStatus.OK);
    }
    @PutMapping("/diagnosis/{diagnosisId}/status")
    public ResponseEntity<UpdatedDiagnosisDto> updateDiagnosisStatus(@PathVariable Long diagnosisId,
                                                               @RequestParam ClientApproval status){

        return new ResponseEntity<>(diagnosisService.updateDiagnosisStatus(diagnosisId,status), HttpStatus.OK);
    }

}
