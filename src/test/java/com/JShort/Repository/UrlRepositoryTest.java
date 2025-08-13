package com.JShort.Repository;

import com.JShort.Model.Url;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class UrlRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UrlRepository urlRepository;

    @Test
    void testSaveUrl_ShouldPersistUrl() {
        // Arrange
        Url url = new Url();
        url.setOriginalUrl("https://www.google.com");
        url.setShortCode("abc123");
        url.setCreationDate(LocalDateTime.now());
        url.setExpirationDate(LocalDateTime.now().plusYears(1));
        url.setAccessCount(0L);

        // Act
        Url savedUrl = urlRepository.save(url);

        // Assert
        assertNotNull(savedUrl.getId());
        assertEquals("https://www.google.com", savedUrl.getOriginalUrl());
        assertEquals("abc123", savedUrl.getShortCode());
        assertEquals(0L, savedUrl.getAccessCount());
    }

    @Test
    void testFindByShortCode_ExistingCode_ShouldReturnUrl() {
        // Arrange
        Url url = new Url();
        url.setOriginalUrl("https://www.example.com");
        url.setShortCode("xyz789");
        url.setCreationDate(LocalDateTime.now());
        url.setExpirationDate(LocalDateTime.now().plusYears(1));
        url.setAccessCount(0L);

        entityManager.persistAndFlush(url);

        // Act
        Optional<Url> found = urlRepository.findByShortCode("xyz789");

        // Assert
        assertTrue(found.isPresent());
        assertEquals("https://www.example.com", found.get().getOriginalUrl());
        assertEquals("xyz789", found.get().getShortCode());
    }

    @Test
    void testFindByShortCode_NonExistingCode_ShouldReturnEmpty() {
        // Act
        Optional<Url> found = urlRepository.findByShortCode("nonexistent");

        // Assert
        assertFalse(found.isPresent());
    }

    @Test
    void testFindByOriginalUrl_ExistingUrl_ShouldReturnUrl() {
        // Arrange
        Url url = new Url();
        url.setOriginalUrl("https://www.test.com");
        url.setShortCode("test123");
        url.setCreationDate(LocalDateTime.now());
        url.setExpirationDate(LocalDateTime.now().plusYears(1));
        url.setAccessCount(0L);

        entityManager.persistAndFlush(url);

        // Act
        Optional<Url> found = urlRepository.findByOriginalUrl("https://www.test.com");

        // Assert
        assertTrue(found.isPresent());
        assertEquals("https://www.test.com", found.get().getOriginalUrl());
        assertEquals("test123", found.get().getShortCode());
    }

    @Test
    void testFindByOriginalUrl_NonExistingUrl_ShouldReturnEmpty() {
        // Act
        Optional<Url> found = urlRepository.findByOriginalUrl("https://www.nonexistent.com");

        // Assert
        assertFalse(found.isPresent());
    }

    @Test
    void testSaveUrl_ShouldGenerateId() {
        // Arrange
        Url url = new Url();
        url.setOriginalUrl("https://www.new.com");
        url.setShortCode("new456");
        url.setCreationDate(LocalDateTime.now());
        url.setExpirationDate(LocalDateTime.now().plusYears(1));
        url.setAccessCount(0L);

        // Act
        Url savedUrl = urlRepository.save(url);

        // Assert
        assertNotNull(savedUrl.getId());
        assertFalse(savedUrl.getId().isEmpty());
    }

    @Test
    void testUpdateUrl_ShouldPersistChanges() {
        // Arrange
        Url url = new Url();
        url.setOriginalUrl("https://www.update.com");
        url.setShortCode("update789");
        url.setCreationDate(LocalDateTime.now());
        url.setExpirationDate(LocalDateTime.now().plusYears(1));
        url.setAccessCount(0L);

        Url savedUrl = urlRepository.save(url);

        // Act
        savedUrl.setAccessCount(5L);
        Url updatedUrl = urlRepository.save(savedUrl);

        // Assert
        assertEquals(5L, updatedUrl.getAccessCount());
        assertEquals(savedUrl.getId(), updatedUrl.getId());
    }

    @Test
    void testUrlConstraints_ShortCodeShouldBeUnique() {
        // Arrange
        Url url1 = new Url();
        url1.setOriginalUrl("https://www.first.com");
        url1.setShortCode("unique123");
        url1.setCreationDate(LocalDateTime.now());
        url1.setExpirationDate(LocalDateTime.now().plusYears(1));
        url1.setAccessCount(0L);

        Url url2 = new Url();
        url2.setOriginalUrl("https://www.second.com");
        url2.setShortCode("unique123"); // Mesmo shortCode
        url2.setCreationDate(LocalDateTime.now());
        url2.setExpirationDate(LocalDateTime.now().plusYears(1));
        url2.setAccessCount(0L);

        // Act & Assert
        urlRepository.save(url1);
        
        // Deve falhar ao tentar salvar com o mesmo shortCode
        assertThrows(Exception.class, () -> {
            urlRepository.save(url2);
            entityManager.flush();
        });
    }

    @Test
    void testUrlConstraints_OriginalUrlShouldNotBeNull() {
        // Arrange
        Url url = new Url();
        url.setOriginalUrl(null);
        url.setShortCode("null123");
        url.setCreationDate(LocalDateTime.now());
        url.setExpirationDate(LocalDateTime.now().plusYears(1));
        url.setAccessCount(0L);

        // Act & Assert
        assertThrows(Exception.class, () -> {
            urlRepository.save(url);
            entityManager.flush();
        });
    }

    @Test
    void testUrlConstraints_ShortCodeShouldNotBeNull() {
        // Arrange
        Url url = new Url();
        url.setOriginalUrl("https://www.nullcode.com");
        url.setShortCode(null);
        url.setCreationDate(LocalDateTime.now());
        url.setExpirationDate(LocalDateTime.now().plusYears(1));
        url.setAccessCount(0L);

        // Act & Assert
        assertThrows(Exception.class, () -> {
            urlRepository.save(url);
            entityManager.flush();
        });
    }
}
