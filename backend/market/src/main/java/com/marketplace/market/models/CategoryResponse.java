package com.marketplace.market.models;

public class CategoryResponse {
    private Category category;
    private String message;
    private String error;

    public CategoryResponse() {
    }

    public CategoryResponse(Category category, String message, String error) {
        this.category = category;
        this.message = message;
        this.error = error;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
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
        return "CategoryResponse [category=" + category + ", message=" + message + ", error=" + error + "]";
    }

}
