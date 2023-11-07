package com.example.backend.service;

public interface SMSService {
    public String sendSMS(String number, String smsMessage);
}
