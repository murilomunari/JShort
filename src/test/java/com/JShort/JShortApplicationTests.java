package com.JShort;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class JShortApplicationTests {

	@Test
	void contextLoads() {
		// Teste básico para verificar se o contexto da aplicação carrega
		// Com o perfil de teste, usará H2 em memória em vez de PostgreSQL
	}

}
