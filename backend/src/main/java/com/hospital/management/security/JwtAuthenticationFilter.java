package com.hospital.management.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtTokenProvider tokenProvider;
    private final UserDetailsServiceImpl userDetailsService;
    
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        boolean shouldSkip = path.startsWith("/auth/") || 
               path.startsWith("/api/auth/") ||
               (path.startsWith("/api/doctors") && request.getMethod().equals("GET"));
        System.out.println("=== shouldNotFilter for path: " + path + " = " + shouldSkip);
        return shouldSkip;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            System.out.println("=== JWT Filter for path: " + request.getServletPath());
            String jwt = getJwtFromRequest(request);
            System.out.println("JWT present: " + (jwt != null) + ", length: " + (jwt != null ? jwt.length() : 0));
            
            if (StringUtils.hasText(jwt)) {
                boolean isValid = tokenProvider.validateToken(jwt);
                System.out.println("JWT validation result: " + isValid);
                
                if (isValid) {
                    String username = tokenProvider.getUsernameFromToken(jwt);
                    System.out.println("Username from token: " + username);
                    
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("Authentication set successfully for user: " + username);
                }
            } else {
                System.out.println("No JWT token found in request");
            }
        } catch (Exception ex) {
            System.err.println("Error in JWT filter: " + ex.getMessage());
            logger.error("Could not set user authentication in security context", ex);
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
