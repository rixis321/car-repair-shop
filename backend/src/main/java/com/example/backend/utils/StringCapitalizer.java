package com.example.backend.utils;

public class StringCapitalizer {

    public static String capitalizeFirstLetter(String text){
        if (text == null || text.isEmpty()) {
            return text;
        }
        return text.substring(0, 1).toUpperCase() + text.substring(1);
    }
    public static String capitalizeString(String input) {
        if (input == null) {
            return null;
        }
        return input.toUpperCase();
    }
}
