package com.rkfood.repository;

import com.rkfood.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    
    List<Product> findByCategory(String category);
    
    List<Product> findByAvailableTrue();
    
    List<Product> findByAvailableTrueOrderByPriceAsc();
    
    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<Product> searchByName(String name);
    
    @Query("{ 'name': { $regex: ?0, $options: 'i' }, 'available': true }")
    List<Product> searchAvailableByName(String name);
}