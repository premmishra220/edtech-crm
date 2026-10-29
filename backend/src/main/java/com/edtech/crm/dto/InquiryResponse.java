package com.edtech.crm.dto;

import com.edtech.crm.entity.Category;
import com.edtech.crm.entity.Inquiry;
import com.edtech.crm.entity.InquiryStatus;
import com.edtech.crm.entity.UserType;
import java.time.LocalDateTime;

public class InquiryResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private UserType userType;
    private Category category;
    private String message;
    private InquiryStatus status;
    private LocalDateTime createdAt;

    public InquiryResponse() {
    }

    public InquiryResponse(Inquiry inquiry) {
        this.id = inquiry.getId();
        this.name = inquiry.getName();
        this.email = inquiry.getEmail();
        this.phone = inquiry.getPhone();
        this.userType = inquiry.getUserType();
        this.category = inquiry.getCategory();
        this.message = inquiry.getMessage();
        this.status = inquiry.getStatus();
        this.createdAt = inquiry.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public InquiryStatus getStatus() {
        return status;
    }

    public void setStatus(InquiryStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
