package com.JShort.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.JShort.Model.Url;

public interface UrlRepository extends JpaRepository<Url, String> {
    
    
}
