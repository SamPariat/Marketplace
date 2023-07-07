package com.marketplace.market.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.marketplace.market.models.Item;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface ItemServices extends JpaRepository<Item, Integer> {
	@Modifying
	@Query("UPDATE Item i SET i.name = :name, i.price = :price, i.stock = :stock, i.active = :active WHERE i.itemId = :itemId")
	void updateItemById(@Param("itemId") int itemId, @Param("name") String name, @Param("price") double price,
			@Param("stock") int stock, @Param("active") boolean active);

	List<Item> findByNameEquals(@Param("name") String name);

}
