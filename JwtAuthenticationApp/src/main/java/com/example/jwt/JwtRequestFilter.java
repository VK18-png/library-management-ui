package com.example.jwt;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/api/*")
public class JwtRequestFilter extends OncePerRequestFilter {

    private JwtUtil jwtUtil = new JwtUtil();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            try {
                String username = jwtUtil.extractUsername(token.substring(7)); // Remove "Bearer " from the token

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // Add authentication to the context
                    if (jwtUtil.validateToken(token, username)) {
                        // Set user details here (for simplicity, using username)
                        SecurityContextHolder.getContext().setAuthentication(new JwtAuthenticationToken(username));
                    }
                }
            } catch (Exception e) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT Token is invalid or expired");
            }
        }
        filterChain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initial setup if necessary
    }

    @Override
    public void destroy() {
        // Cleanup if necessary
    }
}
