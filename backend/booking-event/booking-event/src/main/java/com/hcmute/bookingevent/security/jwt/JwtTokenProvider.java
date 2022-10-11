package com.hcmute.bookingevent.security.jwt;

import com.hcmute.bookingevent.models.Account;

import com.hcmute.bookingevent.payload.LoginReq;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

import java.security.SignatureException;
import java.util.Date;

public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}")  //JWTSuperSecretKey
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}") //864000000
    private int jwtExpirationInMs;

//    Tạo ra token từ chuỗi authentication
    public String generateToken(LoginReq account) {
        //UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        //mã hóa token
        return Jwts.builder()
                .setSubject(String.format("%s,%s", account.getUsername(), account.getPassword())) // mã hóa user name và password
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    //Lấy id_user từ token đã được mã hóa
    public int getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        return (int) Long.parseLong(claims.getSubject());
    }

    //check token
    public boolean validateToken(String authToken) throws SignatureException {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }
}
