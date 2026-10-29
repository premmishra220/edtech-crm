package com.edtech.crm.dto;

import com.edtech.crm.entity.Category;
import com.edtech.crm.entity.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class InquiryRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotNull(message = "User type is required")
    private UserType userType;

    @NotNull(message = "Category is required")
    private Category category;

    @NotBlank(message = "Message is required")
    private String message;

    public InquiryRequest() {
    }

    public InquiryRequest(String name, String email, String phone, UserType userType, Category category, String message) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.userType = userType;
        this.category = category;
        this.message = message;
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
}
