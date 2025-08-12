FROM openjdk:17-jdk-slim

WORKDIR /app

# Copiar o arquivo Maven wrapper e pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Dar permissão de execução ao mvnw
RUN chmod +x mvnw

# Baixar as dependências
RUN ./mvnw dependency:go-offline -B

# Copiar o código fonte
COPY src src

# Compilar a aplicação
RUN ./mvnw clean package -DskipTests

# Criar diretório para a aplicação
RUN mkdir -p /app/target

# Mover o JAR para o diretório de destino
RUN mv target/*.jar /app/target/app.jar

# Expor a porta 8080
EXPOSE 8080

# Comando para executar a aplicação
CMD ["java", "-jar", "/app/target/app.jar"]
