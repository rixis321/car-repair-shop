package com.example.backend.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class InvoiceNumberGenerator {
    public static String generateInvoiceNumber() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");

        String datePart = dateFormat.format(new Date());

        String randomPart = generateRandomNumber();

        return "INV-" + datePart + "-" + randomPart;
    }

    private static String generateRandomNumber() {
        Random random = new Random();
        int randomNumber = random.nextInt(9999 - 1000 + 1) + 1000;
        return String.format("%04d", randomNumber);
    }
}
