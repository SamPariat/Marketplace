package com.marketplace.market.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.models.User;
import com.marketplace.market.models.UserResponse;
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

    @GetMapping(path = "/{userId}")
    public ResponseEntity<UserResponse> getUser(@PathVariable("userId") int userId) {
        try {
            Optional<User> user = userServices.findById(userId);

            if (!user.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new UserResponse(null, null, "Requested user does not exist."));
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new UserResponse(user.get(), "User found successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UserResponse(null, "Some error occurred while getting the user.", e.getMessage()));
        }
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody User user) {
        try {
            userServices.save(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new UserResponse(user, "Successfully signed up the user.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UserResponse(null, "Some error occurred while signing up the user.", e.getMessage()));
        }
    }

    @DeleteMapping(path = "/delete-all")
    public void deleteAllUsers(@RequestBody User user) {
        userServices.deleteAll();
    }

    @DeleteMapping(path = "/delete/{userId}")
    public ResponseEntity<UserResponse> deleteByUserId(@PathVariable("userId") int userId) {
        try {
            Optional<User> user = userServices.findById(userId);

            if (!user.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new UserResponse(null, null, "Requested user does not exist."));
            }

            userServices.deleteById(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new UserResponse(user.get(), "Successfully deleted the user.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UserResponse(null, "Some error occurred while deleting the user.", e.getMessage()));
        }
    }

    @PatchMapping(path = "/update/{userId}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable("userId") int userId, @RequestBody User user) {
        try {
            Optional<User> existingUser = userServices.findById(userId);

            if (!existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new UserResponse(null, null, "Requested user does not exist."));
            }

            userServices.updateUserById(userId, user.getEmail(), user.getPassword(), user.getName(), user.getRole());

            User updatedUser = new User(
                    userId,
                    user.getEmail(),
                    user.getPassword(),
                    user.getName(),
                    user.getRole());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new UserResponse(updatedUser, "Updated user successfully.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new UserResponse(null, "Some error occurred while updating.", e.getMessage()));
        }
    }
}
