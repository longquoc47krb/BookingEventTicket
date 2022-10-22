package com.hcmute.bookingevent.security.jwt;

import com.hcmute.bookingevent.payload.request.LoginReq;

import com.hcmute.bookingevent.security.user.UserDetailsImpl;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
@Component
@Slf4j
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}")  //JWTSuperSecretKey
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}") //864000000
    private int jwtExpirationInMs;
    private final String JWT_HEADER = "authorization";

    public String getJwtFromHeader(HttpServletRequest request) {
        String header = request.getHeader(JWT_HEADER);
        if (header != null)
        {
            //return header.split(" ")[1].trim();
            return header;
        }
        return null;
    }

//    Tạo ra token từ chuỗi authentication
    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        System.out.println(userPrincipal.getEmail());
        return Jwts.builder()
                .setSubject((userPrincipal.getEmail()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    //Lấy id_user từ token đã được mã hóa
    public String getGmailFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    //check token
    public boolean validateJwtToken(String authToken)  {
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
