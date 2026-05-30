# Etapa 1: Build da aplicação Angular
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servidor Nginx para rodar a aplicação
FROM nginx:alpine
# Substitua "porteiro_digital" pelo nome exato que é gerado na pasta dist do seu projeto
COPY --from=build /app/dist/enoque/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]