package com.rkfood.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {
    
    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "RK Foods API is running");
        response.put("status", "healthy");
        response.put("endpoints", Map.of(
            "products", "/api/products",
            "orders", "/api/orders"
        ));
        return response;
    }
}
