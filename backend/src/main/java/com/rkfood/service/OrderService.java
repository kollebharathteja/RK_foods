package com.rkfood.service;

import com.rkfood.model.Order;
import com.rkfood.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    private final String UPLOAD_DIR = "uploads/payments/";
    
    public List<Order> getAllOrders() {
        return orderRepository.findByOrderByCreatedAtDesc();
    }
    
    public List<Order> getOrdersByStatus(String orderStatus) {
        return orderRepository.findByOrderStatus(orderStatus);
    }
    
    public List<Order> getOrdersByPaymentStatus(String paymentStatus) {
        return orderRepository.findByPaymentStatus(paymentStatus);
    }
    
    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElse(null);
    }
    
    public Order createOrder(Order order, MultipartFile paymentScreenshot) throws IOException {
        if (paymentScreenshot != null && !paymentScreenshot.isEmpty()) {
            String screenshotUrl = savePaymentScreenshot(paymentScreenshot);
            order.setPaymentScreenshot(screenshotUrl);
        }
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }
    
    public Order updateOrderStatus(String id, String orderStatus) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setOrderStatus(orderStatus);
            order.setUpdatedAt(LocalDateTime.now());
            return orderRepository.save(order);
        }
        return null;
    }
    
    public Order updatePaymentStatus(String id, String paymentStatus) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setPaymentStatus(paymentStatus);
            order.setUpdatedAt(LocalDateTime.now());
            return orderRepository.save(order);
        }
        return null;
    }
    
    public boolean deleteOrder(String id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    private String savePaymentScreenshot(MultipartFile screenshot) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        String fileName = UUID.randomUUID().toString() + "_" + screenshot.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(screenshot.getInputStream(), filePath);
        
        return "/uploads/payments/" + fileName;
    }
}