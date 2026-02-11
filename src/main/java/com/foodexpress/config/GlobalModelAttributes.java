package com.foodexpress.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalModelAttributes {

    @Value("${google.maps.api.key}")
    private String googleMapsApiKey;

    @ModelAttribute("googleMapsApiKey")
    public String getGoogleMapsApiKey() {
        return googleMapsApiKey;
    }
}
