package com.example.backend.service;

import com.example.backend.payload.Diagnosis.DiagnosisDto;
import com.example.backend.payload.Diagnosis.NewDiagnosisDto;
import com.example.backend.payload.Diagnosis.ShortDiagnosisDto;

public interface DiagnosisService {

    NewDiagnosisDto addDiagnosis(NewDiagnosisDto newDiagnosisDto);

    ShortDiagnosisDto getAllDiagnosis();

    DiagnosisDto getDiagnosisById(Long diagnosisId);

    NewDiagnosisDto updateDiagnosis(NewDiagnosisDto newDiagnosisDto, Long diagnosisId);
}
