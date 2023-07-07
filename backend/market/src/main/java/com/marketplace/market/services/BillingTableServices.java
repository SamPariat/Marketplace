package com.marketplace.market.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marketplace.market.models.BillingTable;

public interface BillingTableServices extends JpaRepository<BillingTable, Integer>{

}
