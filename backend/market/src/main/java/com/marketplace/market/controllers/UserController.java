package com.marketplace.market.controllers;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.models.CustomResponse;
import com.marketplace.market.models.User;
import com.marketplace.market.services.UserServices;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserServices userServices;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping(path = "")
    public ResponseEntity<CustomResponse<List<User>>> getAllUsers() {
        try {
            List<User> users = userServices.findAll();

            if (users.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new CustomResponse<List<User>>(Collections.emptyList(), "No users have been added.",
                                null));
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<List<User>>(users, "All users found successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<List<User>>(null,
                    "Some error occurred while fetching the users.", e.getMessage()));
        }
    }

    @GetMapping(path = "/{userId}")
    public ResponseEntity<CustomResponse<User>> getUser(@PathVariable("userId") int userId) {
        try {
            Optional<User> user = userServices.findById(userId);

            if (!user.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CustomResponse<User>(null, null, "Requested user does not exist."));
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<User>(user.get(), "User found successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse<User>(null, "Some error occurred while getting the user.",
                            e.getMessage()));
        }
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<CustomResponse<User>> signup(@RequestBody User user) {
        try {
        	String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            userServices.save(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new CustomResponse<User>(user, "Successfully signed up the user.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse<User>(null, "Some error occurred while signing up the user.",
                            e.getMessage()));
        }
    }

    @DeleteMapping(path = "/delete/{userId}")
    public ResponseEntity<CustomResponse<User>> deleteByUserId(@PathVariable("userId") int userId) {
        try {
            Optional<User> user = userServices.findById(userId);

            if (!user.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CustomResponse<User>(null, null, "Requested user does not exist."));
            }

            userServices.deleteById(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<User>(user.get(), "Successfully deleted the user.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse<User>(null, "Some error occurred while deleting the user.",
                            e.getMessage()));
        }
    }

    @PatchMapping(path = "/update")
    public ResponseEntity<CustomResponse<User>> updateUser(@RequestParam("id") int userId, @RequestBody User user) {
        try {
            Optional<User> existingUser = userServices.findById(userId);

            if (!existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new CustomResponse<User>(null, null, "Requested user does not exist."));
            }

            userServices.updateUserById(userId, user.getEmail(), user.getPassword(), user.getName(), user.getRole());

            User updatedUser = new User(
                    userId,
                    user.getEmail(),
                    user.getPassword(),
                    user.getName(),
                    user.getRole());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<User>(updatedUser, "Updated user successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomResponse<User>(null, "Some error occurred while updating.", e.getMessage()));
        }
    }
}
