package com.marketplace.market.services;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.marketplace.market.models.ItemSold;

import jakarta.transaction.Transactional;

@Transactional
public interface ItemSoldServices extends JpaRepository<ItemSold, Integer> {
    @Modifying
    @Query("UPDATE ItemSold is SET is.quantity = :quantity WHERE is.id = :id")
    void updateItemSoldById(@Param("id") int id, @Param("quantity") int quantity);

    Optional<ItemSold> findByNameAndId(String name, int id);
}
