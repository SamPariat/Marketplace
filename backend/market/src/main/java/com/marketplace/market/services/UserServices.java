package com.marketplace.market.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.marketplace.market.models.User;

public interface UserServices extends JpaRepository<User, Integer> {

}
