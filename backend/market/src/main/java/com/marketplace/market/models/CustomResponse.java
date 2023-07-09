package com.marketplace.market.models;

public class CustomResponse<T> {
    private T data;
    private String message;
    private String error;

    public CustomResponse() {
    }

    public CustomResponse(T data, String message, String error) {
        this.data = data;
        this.message = message;
        this.error = error;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
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
        return "CustomResponse [data=" + data + ", message=" + message + ", error=" + error + "]";
    }

}
