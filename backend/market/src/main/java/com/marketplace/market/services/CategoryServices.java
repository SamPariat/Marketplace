package com.marketplace.market.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.marketplace.market.models.Category;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface CategoryServices extends JpaRepository<Category, Integer> {
    @Modifying
    @Query("UPDATE Category c SET c.name = :name, c.isTaxApplicable = :isTaxApplicable WHERE c.id = :id")
    void updateCategoryById(@Param("id") int id, @Param("name") String name,
            @Param("isTaxApplicable") boolean isTaxApplicable);
}
