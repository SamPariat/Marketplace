package com.marketplace.market.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.marketplace.market.models.Item;

import jakarta.transaction.Transactional;

@Transactional
public interface ItemServices extends JpaRepository<Item, Integer> {
	@Modifying
	@Query("UPDATE Item i SET i.name = :name, i.price = :price, i.stock = :stock, i.active = :active, i.discountPer = :discountPer, i.costPrice = :costPrice, i.supplier = :supplier WHERE i.itemId = :itemId")
	void updateItemById(@Param("itemId") int itemId, @Param("price") double price, @Param("name") String name,
			@Param("stock") int stock, @Param("active") boolean active, @Param("discountPer") int discountPer,
			@Param("costPrice") int costPrice, @Param("supplier") String supplier);

	List<Item> findByNameEquals(@Param("name") String name);

	List<Item> findByStockLessThanOrderByStockAsc(@Param("stock") int stock);

}
