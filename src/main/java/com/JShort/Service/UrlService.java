package com.JShort.Service;

import com.JShort.Exception.UrlException;
import com.JShort.Model.Url;
import com.JShort.Repository.UrlRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class UrlService {

    private final UrlRepository urlRepository;

    private final Random random = new Random();

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public Url encutadorUrl(String originalUrl) {
        if (originalUrl == null || originalUrl.startsWith("Http")) {
            throw new UrlException("Url Invalida");
        }

        Optional<Url> exist = urlRepository.findByOriginalUrl(originalUrl);
        if (exist.isPresent()) {
            return exist.get();
        }

        String shortCode = gerarShortCode();

        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url.setShortCode(shortCode);
        url.setCreationDate(LocalDateTime.now());
        url.setExpirationDate(LocalDateTime.now());
        url.setAccessCount(0L);

        return urlRepository.save(url);
    }

    public String BuscarUrlOriginal(String shortCode) {
        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(()  -> new UrlException("URL não encontrada"));

        url.setAccessCount(url.getAccessCount());
        urlRepository.save(url);

        return url.getOriginalUrl();
    }

    private String gerarShortCode(){
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }

        return sb.toString();
    }
}
