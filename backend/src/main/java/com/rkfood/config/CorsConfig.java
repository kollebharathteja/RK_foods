package com.rkfood.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    
    @Value("${spring.profiles.active:default}")
    private String activeProfile;
    
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow specific origins in production, localhost in development
        if ("production".equals(activeProfile)) {
            config.addAllowedOrigin("https://frontend-xi-rose-75.vercel.app");
            config.addAllowedOrigin("https://rkfoods.up.railway.app");
            config.addAllowedOriginPattern("*"); // Fallback for any Vercel deployment
        } else {
            config.addAllowedOrigin("http://localhost:5173");
        }
        
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}