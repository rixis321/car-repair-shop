package com.example.backend.service;

import com.example.backend.model.constants.ClientApproval;
import com.example.backend.payload.Diagnosis.*;

import java.util.List;

public interface DiagnosisService {

    NewDiagnosisDto addDiagnosis(NewDiagnosisDto newDiagnosisDto);

    List<DiagnosisWithEmployee> getAllDiagnosis();

    DiagnosisDto getDiagnosisById(Long diagnosisId);

    UpdatedDiagnosisDto updateDiagnosis(UpdatedDiagnosisDto updatedDiagnosisDto, Long diagnosisId);
    UpdatedDiagnosisDto updateDiagnosisStatus(Long diagnosisId ,ClientApproval clientApproval);
    List<ShortDiagnosisDto> getCustomerDiagnosesWithWaitingStatus(Long customerId);


}
