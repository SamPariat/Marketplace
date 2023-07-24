package com.marketplace.market.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marketplace.market.authentication.JwtHelper;
import com.marketplace.market.models.CustomResponse;
import com.marketplace.market.models.LoginRequest;
import com.marketplace.market.models.LoginResponse;
import com.marketplace.market.models.User;
import com.marketplace.market.services.UserServices;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private UserServices userServices;

    @PostMapping("/login")
    public ResponseEntity<CustomResponse<LoginResponse>> login(@RequestBody LoginRequest loginRequest) {
        try {
            doAuthenticate(loginRequest.getEmail(), loginRequest.getPassword());

            // If user doesn't exist, the loadUserByUsername method throws a
            // UsernameNotFoundException
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

            User user = userServices.findByEmail(userDetails.getUsername()).get();

            if (user == null) {
                throw new UsernameNotFoundException("User with specified email not found.");
            }

            // Generate the token if the user exists
            String token = jwtHelper.generateToken(userDetails);

            LoginResponse response = LoginResponse.builder()
                    .jwtToken(token)
                    .email(userDetails.getUsername()).role(user.getRole()).name(user.getName()).build();

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<LoginResponse>(response, "User logged in successfully.", null));
        } catch (UsernameNotFoundException unfe) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new CustomResponse<LoginResponse>(null, "User does not exist.", unfe.getMessage()));
        } catch (BadCredentialsException bce) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new CustomResponse<LoginResponse>(null,
                    "Entered credentials are invalid. Either email or password entered is wrong.", bce.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomResponse<LoginResponse>(null,
                    "Something went wrong while logging in the user.", e.getMessage()));
        }
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            authenticationManager.authenticate(authentication);

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password.");
        }

    }

}
