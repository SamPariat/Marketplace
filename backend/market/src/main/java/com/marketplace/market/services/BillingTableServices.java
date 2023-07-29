package com.marketplace.market.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.marketplace.market.models.BillingTable;
import com.marketplace.market.models.SalesPerDate;

public interface BillingTableServices extends JpaRepository<BillingTable, Integer> {
    @Query("SELECT NEW com.marketplace.market.models.SalesPerDate(SUM(bt.totalAmount), DATE(bt.timeStamp)) FROM BillingTable bt GROUP BY DATE(bt.timeStamp)")
    List<SalesPerDate> salesGroupedByDate();
}
