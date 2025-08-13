package com.JShort.Model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class UrlTest {

    @Test
    void testUrlCreation_ShouldCreateValidUrl() {
        // Arrange
        String id = "test-id-123";
        String originalUrl = "https://www.example.com";
        String shortCode = "abc123";
        LocalDateTime creationDate = LocalDateTime.now();
        LocalDateTime expirationDate = LocalDateTime.now().plusYears(1);
        Long accessCount = 0L;

        // Act
        Url url = new Url();
        url.setId(id);
        url.setOriginalUrl(originalUrl);
        url.setShortCode(shortCode);
        url.setCreationDate(creationDate);
        url.setExpirationDate(expirationDate);
        url.setAccessCount(accessCount);

        // Assert
        assertEquals(id, url.getId());
        assertEquals(originalUrl, url.getOriginalUrl());
        assertEquals(shortCode, url.getShortCode());
        assertEquals(creationDate, url.getCreationDate());
        assertEquals(expirationDate, url.getExpirationDate());
        assertEquals(accessCount, url.getAccessCount());
    }

    @Test
    void testUrlDefaultValues_ShouldHaveCorrectDefaults() {
        // Act
        Url url = new Url();

        // Assert
        assertNull(url.getId());
        assertNull(url.getOriginalUrl());
        assertNull(url.getShortCode());
        assertNull(url.getCreationDate());
        assertNull(url.getExpirationDate());
        assertEquals(0L, url.getAccessCount()); // Valor padrão definido no modelo
    }

    @Test
    void testUrlBuilder_ShouldCreateValidUrl() {
        // Arrange
        String originalUrl = "https://www.builder.com";
        String shortCode = "build123";
        LocalDateTime now = LocalDateTime.now();

        // Act
        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url.setShortCode(shortCode);
        url.setCreationDate(now);
        url.setExpirationDate(now.plusYears(1));
        url.setAccessCount(0L);

        // Assert
        assertEquals(originalUrl, url.getOriginalUrl());
        assertEquals(shortCode, url.getShortCode());
        assertEquals(now, url.getCreationDate());
        assertEquals(now.plusYears(1), url.getExpirationDate());
        assertEquals(0L, url.getAccessCount());
    }

    @Test
    void testUrlAccessCount_Increment_ShouldWork() {
        // Arrange
        Url url = new Url();
        url.setAccessCount(0L);

        // Act
        url.setAccessCount(url.getAccessCount() + 1);

        // Assert
        assertEquals(1L, url.getAccessCount());
    }

    @Test
    void testUrlDates_ShouldBeValid() {
        // Arrange
        Url url = new Url();
        LocalDateTime creationDate = LocalDateTime.now();
        LocalDateTime expirationDate = creationDate.plusYears(1);

        // Act
        url.setCreationDate(creationDate);
        url.setExpirationDate(expirationDate);

        // Assert
        assertTrue(url.getCreationDate().isBefore(url.getExpirationDate()));
        assertEquals(creationDate, url.getCreationDate());
        assertEquals(expirationDate, url.getExpirationDate());
    }

    @Test
    void testUrlCopy_ShouldCreateIndependentCopy() {
        // Arrange
        Url original = new Url();
        original.setId("original-id");
        original.setOriginalUrl("https://www.original.com");
        original.setShortCode("orig123");
        original.setCreationDate(LocalDateTime.now());
        original.setExpirationDate(LocalDateTime.now().plusYears(1));
        original.setAccessCount(10L);

        // Act
        Url copy = new Url();
        copy.setId(original.getId());
        copy.setOriginalUrl(original.getOriginalUrl());
        copy.setShortCode(original.getShortCode());
        copy.setCreationDate(original.getCreationDate());
        copy.setExpirationDate(original.getExpirationDate());
        copy.setAccessCount(original.getAccessCount());

        // Assert
        assertEquals(original.getId(), copy.getId());
        assertEquals(original.getOriginalUrl(), copy.getOriginalUrl());
        assertEquals(original.getShortCode(), copy.getShortCode());
        assertEquals(original.getCreationDate(), copy.getCreationDate());
        assertEquals(original.getExpirationDate(), copy.getExpirationDate());
        assertEquals(original.getAccessCount(), copy.getAccessCount());

        // Modificar o original não deve afetar a cópia
        original.setAccessCount(20L);
        assertEquals(10L, copy.getAccessCount());
    }
}
