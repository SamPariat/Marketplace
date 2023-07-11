package com.marketplace.market.services;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.marketplace.market.models.User;

import jakarta.transaction.Transactional;

@Transactional
public interface UserServices extends JpaRepository<User, Integer> {
	
	public Optional<User> findByEmail(String email);
    @Modifying
    @Query("UPDATE User u SET u.email = :email, u.password = :password, u.name = :name, u.role = :role WHERE u.id = :id")
    void updateUserById(@Param("id") int id, @Param("email") String email, @Param("password") String password,
            @Param("name") String name, @Param("role") int role);
}
