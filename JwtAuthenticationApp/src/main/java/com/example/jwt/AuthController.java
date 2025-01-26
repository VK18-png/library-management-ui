package com.example.jwt;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private JwtUtil jwtUtil = new JwtUtil();

    @PostMapping("/authenticate")
    public String createToken(@RequestBody LoginRequest loginRequest) {
        // In real applications, authenticate the user from the database
        if ("user".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
            return jwtUtil.generateToken(loginRequest.getUsername());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
