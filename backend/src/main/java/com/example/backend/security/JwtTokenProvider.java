package com.example.backend.security;

import com.example.backend.exception.CarRepairShopApiException;
import com.example.backend.model.Employee;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app-jwt-expiration-milliseconds}")
    private long jwtExpirationDate;

    public String generateToken(Authentication authentication, Employee employee,String role){
        String email = authentication.getName();
        Date currentDate = new Date();
        Date expiredDate = new Date(currentDate.getTime() + jwtExpirationDate);
        Map<String, Object> claims = new HashMap<>();
        claims.put("id",employee.getId());
        claims.put("role",role);
        claims.put("name",employee.getName());
        claims.put("lastName",employee.getLastname());
        return Jwts.builder()
                .setSubject(email)
                .claims(claims)
                .setIssuedAt(new Date())
                .setExpiration(expiredDate)
                .signWith(key())
                .compact();
    }

    private Key key(){
        return Keys.hmacShaKeyFor(
                Decoders.BASE64URL.decode(jwtSecret)
        );

    }
    public String getEmail(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token){
        try {

            Jwts.parser()
                    .setSigningKey(key())
                    .build()
                    .parse(token);
                    return true;
        }catch (MalformedJwtException exception){
            throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"Invalid JWT token");
        }catch (ExpiredJwtException exception){
            throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"Expired JWT token");
        }catch (UnsupportedJwtException exception){
            throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"Unsupported JWT token");
        }catch (IllegalArgumentException exception){
            throw new CarRepairShopApiException(HttpStatus.BAD_REQUEST,"JWT claims string is empty");
        }
    }
}
