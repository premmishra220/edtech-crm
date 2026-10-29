package com.edtech.crm.dto;

import com.edtech.crm.entity.InquiryStatus;
import jakarta.validation.constraints.NotNull;

public class StatusUpdateRequest {

    @NotNull(message = "Status is required")
    private InquiryStatus status;

    public StatusUpdateRequest() {
    }

    public StatusUpdateRequest(InquiryStatus status) {
        this.status = status;
    }

    public InquiryStatus getStatus() {
        return status;
    }

    public void setStatus(InquiryStatus status) {
        this.status = status;
    }
}
