package com.groot.server.payload;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private final String jwt;

    public JwtResponse(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }
}
