package com.rkfood.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rkfood.model.Order;
import com.rkfood.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"https://frontend-xi-rose-75.vercel.app", "https://rkfoods.up.railway.app", "*"})
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/status/{orderStatus}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable String orderStatus) {
        List<Order> orders = orderService.getOrdersByStatus(orderStatus);
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/payment-status/{paymentStatus}")
    public ResponseEntity<List<Order>> getOrdersByPaymentStatus(@PathVariable String paymentStatus) {
        List<Order> orders = orderService.getOrdersByPaymentStatus(paymentStatus);
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestParam("customerName") String customerName,
            @RequestParam("customerPhone") String customerPhone,
            @RequestParam("customerAddress") String customerAddress,
            @RequestParam("items") String itemsJson,
            @RequestParam("totalAmount") double totalAmount,
            @RequestParam("paymentMethod") String paymentMethod,
            @RequestParam(value = "paymentScreenshot", required = false) MultipartFile paymentScreenshot) {
        
        try {
            // Parse items JSON string to convert to OrderItem list
            List<Order.OrderItem> items = objectMapper.readValue(itemsJson, new TypeReference<List<Order.OrderItem>>() {});
            
            Order order = new Order(customerName, customerPhone, customerAddress, 
                                   items, totalAmount, paymentMethod, null);
            Order createdOrder = orderService.createOrder(order, paymentScreenshot);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable String id,
            @RequestParam("orderStatus") String orderStatus) {
        Order order = orderService.updateOrderStatus(id, orderStatus);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PatchMapping("/{id}/payment-status")
    public ResponseEntity<Order> updatePaymentStatus(
            @PathVariable String id,
            @RequestParam("paymentStatus") String paymentStatus) {
        Order order = orderService.updatePaymentStatus(id, paymentStatus);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        boolean deleted = orderService.deleteOrder(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}