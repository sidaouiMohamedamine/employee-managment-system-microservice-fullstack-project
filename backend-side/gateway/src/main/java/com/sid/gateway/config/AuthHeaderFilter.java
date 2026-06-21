package com.sid.gateway.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import org.springframework.security.core.context.SecurityContext;

import java.util.Collections;
import java.util.List;
import java.util.Map;

//test
@Component
@Slf4j
public class AuthHeaderFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return ReactiveSecurityContextHolder.getContext()
                .flatMap(ctx -> {
                    Authentication authentication = ctx.getAuthentication();
                    if (!(authentication instanceof JwtAuthenticationToken jwtAuth)) {
                        return chain.filter(exchange);
                    }

                    Jwt jwt = jwtAuth.getToken();
                    String userId   = jwt.getSubject();
                    String username = jwt.getClaimAsString("preferred_username");
                    String email    = jwt.getClaimAsString("email");

                    Map<String, Object> realmAccess = jwt.getClaim("realm_access");
                    @SuppressWarnings("unchecked")
                    List<String> roles = (realmAccess != null)
                            ? (List<String>) realmAccess.get("roles")
                            : Collections.emptyList();
                    String tokenValue = jwt.getTokenValue();

                    ServerHttpRequest mutated = exchange.getRequest().mutate()
                            .header("Authorization", "Bearer " + jwt.getTokenValue())
                            .header("X-User-Id",    userId)
                            .header("X-Username",   username != null ? username : "")
                            .header("X-User-Email", email    != null ? email    : "")
                            .header("X-User-Roles", String.join(",", roles))
                            .build();

                    return chain.filter(exchange.mutate().request(mutated).build());
                })
                .switchIfEmpty(chain.filter(exchange));
    }

    @Override
    public int getOrder() { return -100; }
}