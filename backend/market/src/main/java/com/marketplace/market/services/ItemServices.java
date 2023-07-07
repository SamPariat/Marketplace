package com.marketplace.market.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marketplace.market.models.Item;

public interface ItemServices extends JpaRepository<Item, Integer>  {

	
	List<Item> findByName(String name);
}
