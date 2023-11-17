package com.example.backend.utils;

import java.security.SecureRandom;
import java.util.stream.Collectors;

public class AccessCodeGenerator {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public static String generateCode(){
        SecureRandom secureRandom = new SecureRandom();
        StringBuilder sb = new StringBuilder(8);
        return secureRandom.ints(8,0,CHARACTERS.length())
                .mapToObj(CHARACTERS::charAt)
                .collect(StringBuilder::new,StringBuilder::append,StringBuilder::append)
                .toString();
    }
}
