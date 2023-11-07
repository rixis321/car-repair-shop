package com.example.backend.service.impl;

import com.example.backend.service.SMSService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SMSServiceImpl implements SMSService {

    @Value("${TWILIO_ACCOUNT_SID}")
    private String ACCOUNT_SID;
    @Value("${TWILIO_AUTH_TOKEN}")
    private String AUTH_TOKEN;

    @Value("${TWILIO_SENDER_PHONE_NUMBER}")
    private String SENDER_PHONE_NUMBER;


    @PostConstruct
    private void setup(){
        Twilio.init(ACCOUNT_SID,AUTH_TOKEN);
    }

    public String sendSMS(String number, String smsMessage){
        Message message = Message.creator(
                new PhoneNumber(number),
                new PhoneNumber(SENDER_PHONE_NUMBER),
                smsMessage
        ).create();

        return message.getStatus().toString();
    }
}
