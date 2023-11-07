package com.example.backend.service;

import com.example.backend.payload.Diagnosis.DiagnosisDto;
import com.example.backend.payload.Diagnosis.NewDiagnosisDto;
import com.example.backend.payload.Diagnosis.ShortDiagnosisDto;

import java.util.List;

public interface DiagnosisService {

    NewDiagnosisDto addDiagnosis(NewDiagnosisDto newDiagnosisDto);

    List<ShortDiagnosisDto> getAllDiagnosis();

    DiagnosisDto getDiagnosisById(Long diagnosisId);

    NewDiagnosisDto updateDiagnosis(NewDiagnosisDto newDiagnosisDto, Long diagnosisId);
}
