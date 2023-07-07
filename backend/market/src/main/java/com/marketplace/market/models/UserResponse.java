package com.marketplace.market.models;

public class UserResponse {
    private User user;
    private String message;
    private String error;

    public UserResponse() {
    }

    public UserResponse(User user, String message, String error) {
        this.user = user;
        this.message = message;
        this.error = error;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    @Override
    public String toString() {
        return "UserResponse [user=" + user + ", message=" + message + ", error=" + error + "]";
    }

}
