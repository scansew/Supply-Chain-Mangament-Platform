FROM node:22

# Set working directory inside the container
WORKDIR /app

# Install dependencies first for better caching
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Install all dependencies including devDependencies for development
RUN npm ci

# Copy the entrypoint script with proper line endings and make it executable
RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo '# Entrypoint for backend container: always generate Prisma client before starting server' >> /entrypoint.sh && \
    echo 'set -e' >> /entrypoint.sh && \
    echo 'echo "[Entrypoint] Running: npx prisma generate"' >> /entrypoint.sh && \
    echo 'npx prisma generate' >> /entrypoint.sh && \
    echo 'echo "[Entrypoint] Prisma client generated successfully. Starting server..."' >> /entrypoint.sh && \
    echo 'exec "$@"' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

# Copy the rest of the backend code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port Apollo Server runs on
EXPOSE 4000

# Use the entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npx", "nodemon", "index.js"]
