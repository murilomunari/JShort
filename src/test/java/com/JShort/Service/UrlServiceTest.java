package com.JShort.Service;

import com.JShort.Exception.UrlException;
import com.JShort.Model.Url;
import com.JShort.Repository.UrlRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UrlServiceTest {

    @Mock
    private UrlRepository urlRepository;

    @InjectMocks
    private UrlService urlService;

    private String validUrl;
    private Url savedUrl;

    @BeforeEach
    void setUp() {
        validUrl = "https://www.google.com";

        savedUrl = new Url();
        savedUrl.setId("1");
        savedUrl.setOriginalUrl("https://www.google.com");
        savedUrl.setShortCode("abc123");
        savedUrl.setCreationDate(LocalDateTime.now());
        savedUrl.setExpirationDate(LocalDateTime.now().plusYears(1));
        savedUrl.setAccessCount(0L);
    }

    @Test
    void testEncutadorUrl_ValidUrl_ShouldReturnShortenedUrl() {
        // Arrange
        when(urlRepository.findByOriginalUrl(validUrl)).thenReturn(Optional.empty());
        when(urlRepository.save(any(Url.class))).thenReturn(savedUrl);

        // Act
        Url result = urlService.encutadorUrl(validUrl);

        // Assert
        assertNotNull(result);
        assertEquals(validUrl, result.getOriginalUrl());
        assertNotNull(result.getShortCode());
        assertNotNull(result.getCreationDate());
        assertNotNull(result.getExpirationDate());
        assertEquals(0L, result.getAccessCount());

        verify(urlRepository, times(1)).findByOriginalUrl(validUrl);
        verify(urlRepository, times(1)).save(any(Url.class));
    }

    @Test
    void testEncutadorUrl_EmptyUrl_ShouldThrowException() {
        // Arrange
        String emptyUrl = "";

        // Act & Assert
        assertThrows(UrlException.class, () -> {
            urlService.encutadorUrl(emptyUrl);
        });

        verify(urlRepository, never()).save(any(Url.class));
    }

    @Test
    void testEncutadorUrl_NullUrl_ShouldThrowException() {
        // Act & Assert
        assertThrows(UrlException.class, () -> {
            urlService.encutadorUrl(null);
        });

        verify(urlRepository, never()).save(any(Url.class));
    }

    @Test
    void testEncutadorUrl_InvalidUrlFormat_ShouldThrowException() {
        // Arrange
        String invalidUrl = "invalid-url-format";

        // Act & Assert
        assertThrows(UrlException.class, () -> {
            urlService.encutadorUrl(invalidUrl);
        });

        verify(urlRepository, never()).save(any(Url.class));
    }

    @Test
    void testEncutadorUrl_UrlWithoutHttp_ShouldThrowException() {
        // Arrange
        String urlWithoutHttp = "www.google.com";

        // Act & Assert
        assertThrows(UrlException.class, () -> {
            urlService.encutadorUrl(urlWithoutHttp);
        });

        verify(urlRepository, never()).save(any(Url.class));
    }

    @Test
    void testEncutadorUrl_ExistingUrl_ShouldReturnExistingUrl() {
        // Arrange
        when(urlRepository.findByOriginalUrl(validUrl)).thenReturn(Optional.of(savedUrl));

        // Act
        Url result = urlService.encutadorUrl(validUrl);

        // Assert
        assertEquals(savedUrl, result);
        verify(urlRepository, times(1)).findByOriginalUrl(validUrl);
        verify(urlRepository, never()).save(any(Url.class));
    }

    @Test
    void testBuscarUrlOriginal_ValidShortCode_ShouldReturnOriginalUrl() {
        // Arrange
        String shortCode = "abc123";
        when(urlRepository.findByShortCode(shortCode)).thenReturn(Optional.of(savedUrl));
        when(urlRepository.save(any(Url.class))).thenReturn(savedUrl);

        // Act
        String result = urlService.BuscarUrlOriginal(shortCode);

        // Assert
        assertEquals(savedUrl.getOriginalUrl(), result);
        verify(urlRepository, times(1)).findByShortCode(shortCode);
        verify(urlRepository, times(1)).save(any(Url.class));
    }

    @Test
    void testBuscarUrlOriginal_InvalidShortCode_ShouldThrowException() {
        // Arrange
        String invalidShortCode = "invalid";
        when(urlRepository.findByShortCode(invalidShortCode)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UrlException.class, () -> {
            urlService.BuscarUrlOriginal(invalidShortCode);
        });

        verify(urlRepository, times(1)).findByShortCode(invalidShortCode);
        verify(urlRepository, never()).save(any(Url.class));
    }

    @Test
    void testBuscarUrlOriginal_ValidUrl_ShouldIncrementAccessCount() {
        // Arrange
        String shortCode = "abc123";
        when(urlRepository.findByShortCode(shortCode)).thenReturn(Optional.of(savedUrl));
        when(urlRepository.save(any(Url.class))).thenReturn(savedUrl);

        // Act
        String result = urlService.BuscarUrlOriginal(shortCode);

        // Assert
        assertEquals(savedUrl.getOriginalUrl(), result);
        verify(urlRepository, times(1)).save(any(Url.class));
    }

    @Test
    void testEncutadorUrl_ValidHttpUrl_ShouldWork() {
        // Arrange
        String httpUrl = "http://example.com";
        Url httpSavedUrl = new Url();
        httpSavedUrl.setId("2");
        httpSavedUrl.setOriginalUrl(httpUrl);
        httpSavedUrl.setShortCode("http123");
        httpSavedUrl.setCreationDate(LocalDateTime.now());
        httpSavedUrl.setExpirationDate(LocalDateTime.now().plusYears(1));
        httpSavedUrl.setAccessCount(0L);

        when(urlRepository.findByOriginalUrl(httpUrl)).thenReturn(Optional.empty());
        when(urlRepository.save(any(Url.class))).thenReturn(httpSavedUrl);

        // Act
        Url result = urlService.encutadorUrl(httpUrl);

        // Assert
        assertNotNull(result);
        assertEquals(httpUrl, result.getOriginalUrl());
        verify(urlRepository, times(1)).save(any(Url.class));
    }

    @Test
    void testEncutadorUrl_ValidHttpsUrl_ShouldWork() {
        // Arrange
        String httpsUrl = "https://secure.example.com";
        Url httpsSavedUrl = new Url();
        httpsSavedUrl.setId("3");
        httpsSavedUrl.setOriginalUrl(httpsUrl);
        httpsSavedUrl.setShortCode("https123");
        httpsSavedUrl.setCreationDate(LocalDateTime.now());
        httpsSavedUrl.setExpirationDate(LocalDateTime.now().plusYears(1));
        httpsSavedUrl.setAccessCount(0L);

        when(urlRepository.findByOriginalUrl(httpsUrl)).thenReturn(Optional.empty());
        when(urlRepository.save(any(Url.class))).thenReturn(httpsSavedUrl);

        // Act
        Url result = urlService.encutadorUrl(httpsUrl);

        // Assert
        assertNotNull(result);
        assertEquals(httpsUrl, result.getOriginalUrl());
        verify(urlRepository, times(1)).save(any(Url.class));
    }

    @Test
    void testEncutadorUrl_UrlWithSpaces_ShouldThrowException() {
        // Arrange
        String urlWithSpaces = "   https://www.google.com   ";

        // Act & Assert
        assertThrows(UrlException.class, () -> {
            urlService.encutadorUrl(urlWithSpaces);
        });

        verify(urlRepository, never()).save(any(Url.class));
    }

    @Test
    void testShortCodeGeneration_ShouldGenerateValidCode() {
        // Arrange
        when(urlRepository.findByOriginalUrl(validUrl)).thenReturn(Optional.empty());
        when(urlRepository.save(any(Url.class))).thenReturn(savedUrl);

        // Act
        Url result = urlService.encutadorUrl(validUrl);

        // Assert
        assertNotNull(result.getShortCode());
        assertEquals(6, result.getShortCode().length());
        assertTrue(result.getShortCode().matches("[a-zA-Z0-9]+"));
    }
}
