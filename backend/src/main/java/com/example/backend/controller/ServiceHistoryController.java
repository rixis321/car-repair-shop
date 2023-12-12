package com.example.backend.controller;

import com.example.backend.payload.History.NewServiceHistoryDto;
import com.example.backend.payload.History.ServiceHistoryDto;
import com.example.backend.service.RepairHistoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ServiceHistoryController {
    private final RepairHistoryService repairHistoryService;

    public ServiceHistoryController(RepairHistoryService repairHistoryService) {
        this.repairHistoryService = repairHistoryService;
    }

    @PostMapping("/employees/{employeeId}/services/{serviceId}/history")
    public ResponseEntity<NewServiceHistoryDto> addRepairStage(@RequestBody NewServiceHistoryDto newServiceHistoryDto,
                                                           @PathVariable Long employeeId,
                                                           @PathVariable Long serviceId){

        return new ResponseEntity<>(repairHistoryService.addRepairStage(newServiceHistoryDto,serviceId,employeeId), HttpStatus.CREATED);
    }
    @DeleteMapping("/services/{serviceId}/history/{repairStageId}")
    public ResponseEntity<String> deleteRepairStageById(@PathVariable Long serviceId, @PathVariable Long repairStageId){
        return new ResponseEntity<>(repairHistoryService.deleteServiceHistoryElementById(serviceId, repairStageId),HttpStatus.OK);
    }
    @GetMapping("/services/{serviceId}/history")
    public ResponseEntity<List<ServiceHistoryDto>> getServiceRepairHistory(@PathVariable Long serviceId){
        List<ServiceHistoryDto> historyDtoList = repairHistoryService.getServiceRepairHistory(serviceId);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(isAuthorizedUser(authentication)){
            return new ResponseEntity<>(historyDtoList, HttpStatus.CREATED);
        }else{
           historyDtoList
                   .forEach(history -> history.setFullEmployeeName(null));
            return new ResponseEntity<>(historyDtoList, HttpStatus.OK);
        }

    }
    private boolean hasAnyRole(Authentication authentication, String... roles) {
        return authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority ->
                        Arrays.asList(roles).contains(grantedAuthority.getAuthority())
                );
    }
    private boolean isAuthorizedUser(Authentication authentication) {
        return hasAnyRole(authentication, "ADMIN", "RECEPCJONISTA", "MECHANIK");
    }

}
