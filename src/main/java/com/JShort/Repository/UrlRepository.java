package com.JShort.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JShort.Model.Url;

import java.util.Optional;

public interface UrlRepository extends JpaRepository<Url, String> {

    Optional<Url> findByOriginalUrl(String originalUrl);

    Optional<Url> findByShortCode(String shortCode);
    
    
}
