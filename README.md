# JShort Frontend

Frontend moderno para o encurtador de URLs JShort, desenvolvido com React.js e TypeScript.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP para requisições à API
- **Heroicons** - Ícones SVG otimizados

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── UrlShortener.tsx # Componente principal de encurtamento
│   ├── Features.tsx    # Seção de recursos
│   └── Footer.tsx      # Rodapé da aplicação
├── services/           # Serviços de API
│   └── api.ts         # Cliente HTTP e métodos da API
├── types/              # Definições de tipos TypeScript
│   └── index.ts       # Interfaces e tipos
├── config/             # Configurações da aplicação
│   └── config.ts      # Variáveis de configuração
└── App.tsx             # Componente principal da aplicação
```

## 🛠️ Instalação

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   REACT_APP_API_URL=http://localhost:8080/api
   ```

3. **Executar em modo de desenvolvimento:**
   ```bash
   npm start
   ```

4. **Build para produção:**
   ```bash
   npm run build
   ```

## 🌐 Funcionalidades

### ✨ Encurtamento de URLs
- Interface intuitiva para inserção de URLs
- Validação de formato de URL
- Feedback visual durante o processo
- Exibição de estatísticas da URL encurtada

### 📊 Estatísticas
- Contador de acessos em tempo real
- Data de criação da URL
- Data de expiração configurável
- Código curto único

### 🎨 Interface Moderna
- Design responsivo para todos os dispositivos
- Componentes reutilizáveis
- Animações e transições suaves
- Tema consistente com Tailwind CSS

### 🔗 Integração com API
- Comunicação REST com backend Spring Boot
- Tratamento de erros robusto
- Feedback visual para o usuário
- Suporte a CORS

## 🎯 Como Usar

1. **Acesse a aplicação** no navegador
2. **Insira uma URL** no campo de texto
3. **Clique em "Encurtar URL"**
4. **Copie a URL encurtada** gerada
5. **Compartilhe** a URL encurtada

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `REACT_APP_API_URL` | URL base da API backend | `http://localhost:8080/api` |

### Personalização

- **Cores**: Edite `tailwind.config.js` para personalizar o tema
- **Componentes**: Modifique os componentes em `src/components/`
- **API**: Ajuste as configurações em `src/services/api.ts`

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- 📱 Dispositivos móveis
- 💻 Tablets
- 🖥️ Desktops
- 🖥️ Telas grandes

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

### Servidor Estático
```bash
npx serve -s build
```

### Docker (opcional)
```bash
docker build -t jshort-frontend .
docker run -p 3000:80 jshort-frontend
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

**Murilo Munari** - [GitHub](https://github.com/murilomunari)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
