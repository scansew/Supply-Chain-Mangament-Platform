FROM node:22

# Set working directory inside the container
WORKDIR /app


# Copy package files and prisma schema

# Copy package files and prisma schema
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev

# Copy the rest of the backend code after installing dependencies
COPY . .

# Expose the port Apollo Server runs on
EXPOSE 4000

# Use volume for code mounting (set in docker-compose, not here)
# Entrypoint script ensures Prisma client is generated after volume mount
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npx", "nodemon", "index.js"]
