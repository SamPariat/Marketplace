package com.marketplace.market.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.marketplace.market.models.Consumer;
import com.marketplace.market.models.Item;

public interface ConsumerServices extends JpaRepository<Consumer, Integer> {
	Optional<Consumer> findByPhoneNo(@Param("name") String phoneNo);

	void deleteByPhoneNo(String phoneNo);

}
