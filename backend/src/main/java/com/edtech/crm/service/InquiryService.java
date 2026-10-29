package com.edtech.crm.service;

import com.edtech.crm.dto.InquiryRequest;
import com.edtech.crm.dto.InquiryResponse;
import com.edtech.crm.dto.StatusUpdateRequest;
import com.edtech.crm.entity.Category;
import com.edtech.crm.entity.Inquiry;
import com.edtech.crm.entity.UserType;
import com.edtech.crm.exception.ResourceNotFoundException;
import com.edtech.crm.repository.InquiryRepository;
import com.edtech.crm.repository.InquirySpecification;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    public InquiryResponse createInquiry(InquiryRequest request) {
        Inquiry inquiry = new Inquiry(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getUserType(),
                request.getCategory(),
                request.getMessage()
        );

        Inquiry saved = inquiryRepository.save(inquiry);
        return new InquiryResponse(saved);
    }

    public List<InquiryResponse> getInquiries(Category category, UserType userType, String search) {
        Specification<Inquiry> spec = InquirySpecification.filterBy(category, userType, search);
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");

        return inquiryRepository.findAll(spec, sort)
                .stream()
                .map(InquiryResponse::new)
                .toList();
    }

    public InquiryResponse getInquiryById(Long id) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found with id: " + id));
        return new InquiryResponse(inquiry);
    }

    public InquiryResponse updateStatus(Long id, StatusUpdateRequest request) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found with id: " + id));

        inquiry.setStatus(request.getStatus());
        Inquiry updated = inquiryRepository.save(inquiry);
        return new InquiryResponse(updated);
    }
}
