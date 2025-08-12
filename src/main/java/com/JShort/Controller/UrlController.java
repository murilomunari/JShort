package com.JShort.Controller;

import com.JShort.DTO.UrlDTO;
import com.JShort.Model.Url;
import com.JShort.Service.UrlService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/url")
public class UrlController {

    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping("/encurtar")
    public ResponseEntity<Url> encurtarUrl(@RequestBody UrlDTO data) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(urlService.encutadorUrl(data.getOriginalUrl()));
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirecionar(@PathVariable String shortCode) {
        String originalUrl = urlService.BuscarUrlOriginal(shortCode);

        if (originalUrl != null) {
            return ResponseEntity
                    .status(HttpStatus.FOUND) // 302
                    .location(URI.create(originalUrl))
                    .build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}


