package com.marketplace.market.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marketplace.market.models.ItemSold;

import jakarta.transaction.Transactional;

@Transactional
public interface ItemSoldServices extends JpaRepository<ItemSold, Integer> {

}
