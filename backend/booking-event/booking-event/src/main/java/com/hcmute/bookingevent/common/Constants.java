package com.hcmute.bookingevent.common;

public class Constants {
    public static final String MY_EMAIL = "swan4567890@gmail.com";
    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_ORGANIZATION = "ROLE_ORGANIZATION";
    //public static final String METHOD_GOOGLE = "METHOD_GOOGLE";
    public static final String AVATAR_DEFAULT="https://microbiology.ucr.edu/sites/default/files/styles/form_preview/public/blank-profile-pic.png?itok=4teBBoet&fbclid=IwAR03Tfvnn76qi4wfpBrxw004mEad1Ho9qR89fF_D4jyBAwaE5DdXWa4ltjU";

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
}


