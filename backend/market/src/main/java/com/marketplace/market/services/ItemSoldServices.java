package com.marketplace.market.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marketplace.market.models.ItemSold;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface ItemSoldServices extends JpaRepository<ItemSold, Integer> {

}
