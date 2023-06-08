package com.hcmute.bookingevent.common;

import java.text.NumberFormat;
import java.util.Currency;
import java.util.Locale;

public class Constants {
    public static final String MY_EMAIL = "lotusticketvn2@gmail.com";
    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_ORGANIZATION = "ROLE_ORGANIZATION";
    //public static final String METHOD_GOOGLE = "METHOD_GOOGLE";
    public static final String AVATAR_DEFAULT="https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg";

    public static String getAlphaNumericString(int n) {

        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);

        for (int i = 0; i < n; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int) (AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }

        return sb.toString();
    }
    public static String formatCurrency(String currencyCode, String price) {
        Double priceDouble = Double.parseDouble(price);
        Currency currency = Currency.getInstance(currencyCode);
        NumberFormat formatter = NumberFormat.getCurrencyInstance(Locale.getDefault());
        formatter.setCurrency(currency);
        return formatter.format(priceDouble);
    }
    public static String convertCurrencyFormat(String formattedCurrency, String currencyCode) {
        String convertedCurrency = formattedCurrency
                .replace("$", "")
                .replace("₫", "")
                .trim();
        return convertedCurrency + " " + currencyCode;
    }
}


