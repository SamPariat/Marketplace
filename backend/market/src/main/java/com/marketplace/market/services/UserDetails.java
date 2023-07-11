package com.marketplace.market.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.marketplace.market.models.User;

@Service
public class UserDetails implements UserDetailsService {

	@Autowired
	private UserServices userServices;
	@Override
	public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user=userServices.findByEmail(username).orElseThrow(()->new RuntimeException("User not Found"));
		return user;
	}

}
