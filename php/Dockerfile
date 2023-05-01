# Definir a imagem base a ser usada (por exemplo, imagem oficial do PHP)
FROM php:7.4-fpm

# Instalar extensões PHP necessárias (por exemplo, para trabalhar com banco de dados)
RUN docker-php-ext-install pdo pdo_pgsql pgsql

# Instalar o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar o código da aplicação para o diretório de trabalho do container
COPY . /var/www/html

# Instalar as dependências do Laravel
RUN composer install

# Definir as variáveis de ambiente necessárias para a aplicação (por exemplo, conexão com o banco de dados)
ENV POSTGRES_USER=postgres POSTGRES_PASSWORD= POSTGRES_DB=todolist

# Expor a porta 9000 para que possa ser acessada fora do container (opcional)
EXPOSE 9000

# Comando para iniciar o servidor PHP-FPM
CMD ["php-fpm"]
