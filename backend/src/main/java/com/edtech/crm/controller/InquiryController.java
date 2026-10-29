package com.edtech.crm.controller;

import com.edtech.crm.dto.InquiryRequest;
import com.edtech.crm.dto.InquiryResponse;
import com.edtech.crm.dto.StatusUpdateRequest;
import com.edtech.crm.entity.Category;
import com.edtech.crm.entity.UserType;
import com.edtech.crm.service.InquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping
    public ResponseEntity<InquiryResponse> submitInquiry(@Valid @RequestBody InquiryRequest request) {
        InquiryResponse response = inquiryService.createInquiry(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<InquiryResponse>> getInquiries(
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) UserType userType,
            @RequestParam(required = false) String search
    ) {
        List<InquiryResponse> inquiries = inquiryService.getInquiries(category, userType, search);
        return ResponseEntity.ok(inquiries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InquiryResponse> getInquiryById(@PathVariable Long id) {
        InquiryResponse response = inquiryService.getInquiryById(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<InquiryResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request
    ) {
        InquiryResponse response = inquiryService.updateStatus(id, request);
        return ResponseEntity.ok(response);
    }
}
