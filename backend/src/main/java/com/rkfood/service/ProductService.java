package com.rkfood.service;

import com.rkfood.model.Product;
import com.rkfood.repository.ProductRepository;
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
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    private final String UPLOAD_DIR = "uploads/";
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    public List<Product> getAvailableProducts() {
        return productRepository.findByAvailableTrue();
    }
    
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }
    
    public Product getProductById(String id) {
        return productRepository.findById(id).orElse(null);
    }
    
    public List<Product> searchProducts(String name) {
        return productRepository.searchAvailableByName(name);
    }
    
    public Product createProduct(Product product, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            product.setImageUrl(imageUrl);
        }
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }
    
    public Product updateProduct(String id, Product product, MultipartFile image) throws IOException {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct == null) {
            return null;
        }
        
        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            product.setImageUrl(imageUrl);
        } else {
            product.setImageUrl(existingProduct.getImageUrl());
        }
        
        product.setId(id);
        product.setCreatedAt(existingProduct.getCreatedAt());
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }
    
    public boolean deleteProduct(String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public Product toggleAvailability(String id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            product.setAvailable(!product.isAvailable());
            product.setUpdatedAt(LocalDateTime.now());
            return productRepository.save(product);
        }
        return null;
    }
    
    private String saveImage(MultipartFile image) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(image.getInputStream(), filePath);
        
        return "/uploads/" + fileName;
    }
}