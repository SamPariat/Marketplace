package com.marketplace.market.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marketplace.market.models.Category;

public interface CategoryServices extends JpaRepository<Category, Integer> {
    
}
