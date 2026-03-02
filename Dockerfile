# ----------------------------
# 1️⃣ Build React Frontend
# ----------------------------
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build


# ----------------------------
# 2️⃣ Setup Backend
# ----------------------------
FROM node:20-alpine

WORKDIR /app/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source
COPY backend/ ./

# Copy built frontend into backend (for serving static files)
COPY --from=frontend-build /app/frontend/build ./public

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["node", "server.js"]
