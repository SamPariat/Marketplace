package com.marketplace.market.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.marketplace.market.models.Category;

import jakarta.transaction.Transactional;

@Transactional
public interface CategoryServices extends JpaRepository<Category, Integer> {
    @Modifying
    @Query("UPDATE Category c SET c.name = :name, c.isTaxApplicable = :isTaxApplicable, c.tax = :tax, c.serviceTax = :serviceTax WHERE c.id = :id")
    void updateCategoryById(@Param("id") int id, @Param("name") String name, @Param("isTaxApplicable") boolean isTaxApplicable, @Param("tax") int tax, @Param("serviceTax") int serviceTax);

}
