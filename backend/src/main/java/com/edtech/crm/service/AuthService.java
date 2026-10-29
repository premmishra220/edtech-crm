package com.edtech.crm.service;

import com.edtech.crm.dto.AuthResponse;
import com.edtech.crm.dto.LoginRequest;
import com.edtech.crm.dto.RegisterRequest;
import com.edtech.crm.entity.Admin;
import com.edtech.crm.exception.BadRequestException;
import com.edtech.crm.repository.AdminRepository;
import com.edtech.crm.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            AuthenticationManager authenticationManager
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        if (adminRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        Admin admin = new Admin(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                "ADMIN"
        );

        adminRepository.save(admin);

        String token = jwtUtil.generateToken(admin.getEmail());
        return new AuthResponse(token, admin.getEmail(), admin.getName(), admin.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Admin not found"));

        String token = jwtUtil.generateToken(admin.getEmail());
        return new AuthResponse(token, admin.getEmail(), admin.getName(), admin.getRole());
    }
}
