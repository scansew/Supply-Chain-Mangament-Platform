FROM node:22

# Set working directory inside the container
WORKDIR /app

# Install dependencies first for better caching
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Install all dependencies including devDependencies for development
RUN npm ci

# Copy the rest of the backend code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port Apollo Server runs on
EXPOSE 4000

# Use volume for code mounting (set in docker-compose, not here)
# Entrypoint script ensures Prisma client is generated after volume mount
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npx", "nodemon", "index.js"]
