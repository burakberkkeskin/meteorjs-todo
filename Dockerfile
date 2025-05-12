cat Dockerfile 
# Build stage
FROM node:18-slim as builder

# Set environment variable to allow Meteor to run as root in build process
ENV METEOR_ALLOW_SUPERUSER=true

# Set working directory
WORKDIR /app

# Install Meteor
RUN apt-get update && apt-get install -y curl procps python3 g++ build-essential git ca-certificates && \
    curl https://install.meteor.com/ | sh && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy meteor application code
COPY . .

# Build the meteor application
RUN meteor npm install && \
    meteor build --directory /build --server-only

# Install production dependencies
WORKDIR /build/bundle/programs/server
RUN npm install --production

# Final stage
FROM node:18-slim

# Set environment variables
ENV PORT=3000 \
    ROOT_URL=http://localhost:3000 \
    MONGO_URL=mongodb://mongo:27017/meteor \
    NODE_ENV=production

# Set working directory
WORKDIR /app

# Install required runtime dependencies
RUN apt-get update && apt-get install -y ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -r meteor && useradd -r -g meteor meteor

# Copy built app from the builder stage
COPY --from=builder /build/bundle /app

# Set proper permissions
RUN chown -R meteor:meteor /app

# Switch to non-root user
USER meteor

# Expose the application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Start the application
CMD ["node", "main.js"]