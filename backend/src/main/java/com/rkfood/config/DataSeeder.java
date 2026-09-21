package com.rkfood.config;

import com.rkfood.model.Product;
import com.rkfood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Only seed if database is empty
        if (productRepository.count() == 0) {
            List<Product> products = Arrays.asList(
                // Main Course
                new Product("Butter Chicken", 
                    "Tender chicken pieces in a rich, creamy tomato-based curry with butter", 
                    350.00, "Main Course", null, true, 20),
                new Product("Paneer Tikka Masala", 
                    "Grilled paneer cubes in a spiced tomato and onion gravy", 
                    280.00, "Main Course", null, true, 15),
                new Product("Biryani", 
                    "Fragrant basmati rice cooked with aromatic spices and your choice of meat/vegetables", 
                    320.00, "Main Course", null, true, 25),
                
                // Appetizers
                new Product("Samosa (2 pieces)", 
                    "Crispy pastry filled with spiced potatoes and peas", 
                    60.00, "Appetizers", null, true, 50),
                new Product("Onion Pakora", 
                    "Crispy fritters made with gram flour and sliced onions", 
                    80.00, "Appetizers", null, true, 40),
                
                // Breads
                new Product("Naan", 
                    "Soft, leavened flatbread baked in a tandoor", 
                    40.00, "Breads", null, true, 100),
                new Product("Garlic Naan", 
                    "Naan topped with minced garlic and coriander", 
                    50.00, "Breads", null, true, 80),
                
                // Beverages
                new Product("Mango Lassi", 
                    "Refreshing yogurt-based drink with mango pulp", 
                    90.00, "Beverages", null, true, 30),
                new Product("Masala Chai", 
                    "Traditional Indian spiced tea", 
                    40.00, "Beverages", null, true, 100),
                
                // Desserts
                new Product("Gulab Jamun (4 pieces)", 
                    "Deep-fried milk solids soaked in sugar syrup", 
                    120.00, "Desserts", null, true, 25),
                new Product("Rasmalai", 
                    "Soft paneer dumplings in sweetened, flavored milk", 
                    150.00, "Desserts", null, true, 20)
            );
            
            productRepository.saveAll(products);
            System.out.println("Database seeded with " + products.size() + " sample products");
        }
    }
}
