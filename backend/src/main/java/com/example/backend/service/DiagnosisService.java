package com.example.backend.service;

import com.example.backend.payload.Diagnosis.DiagnosisDto;
import com.example.backend.payload.Diagnosis.DiagnosisWithEmployee;
import com.example.backend.payload.Diagnosis.NewDiagnosisDto;
import com.example.backend.payload.Diagnosis.UpdatedDiagnosisDto;

import java.util.List;

public interface DiagnosisService {

    NewDiagnosisDto addDiagnosis(NewDiagnosisDto newDiagnosisDto);

    List<DiagnosisWithEmployee> getAllDiagnosis();

    DiagnosisDto getDiagnosisById(Long diagnosisId);

    UpdatedDiagnosisDto updateDiagnosis(UpdatedDiagnosisDto updatedDiagnosisDto, Long diagnosisId);
}
