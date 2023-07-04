package com.marketplace.market.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.models.User;
import com.marketplace.market.services.UserServices;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserServices userServices;

    @GetMapping(path = "")
    public List<User> getAllUsers() {
        return userServices.findAll();
    }

    @PostMapping(path = "/signup")
    public User signup(@RequestBody User user) {
        return userServices.save(user);
    }

    @DeleteMapping(path = "/delete")
    public void delete(@RequestBody User user) {
        userServices.delete(user);
    }
}
