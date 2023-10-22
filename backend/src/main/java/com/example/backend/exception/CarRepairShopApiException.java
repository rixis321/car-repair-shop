package com.example.backend.exception;

import org.springframework.http.HttpStatus;

public class CarRepairShopApiException extends RuntimeException {
    private final HttpStatus status;
    private final String message;

    public CarRepairShopApiException(HttpStatus status, String message){
        super(message);
        this.status = status;
        this.message = message;
    }
    public HttpStatus getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
