package com.rkfood.repository;

import com.rkfood.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    
    List<Order> findByOrderByCreatedAtDesc();
    
    List<Order> findByOrderStatus(String orderStatus);
    
    List<Order> findByPaymentStatus(String paymentStatus);
    
    List<Order> findByCustomerPhone(String customerPhone);
    
    List<Order> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
}