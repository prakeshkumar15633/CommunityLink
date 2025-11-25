FROM node:18

# Set working dir
WORKDIR /app

# -------------------------------
# Install backend dependencies
# -------------------------------
COPY backend/package*.json backend/
RUN cd backend && npm install

# -------------------------------
# Install & build frontend
# -------------------------------
COPY frontend frontend/
RUN cd frontend && npm install && npm run build

# -------------------------------
# Copy source code
# -------------------------------
COPY backend backend/

# Move frontend build → backend/build
RUN cp -r frontend/build backend/build

# Set final working dir as backend
WORKDIR /app/backend

ENV PORT=4000
EXPOSE 4000

CMD ["npm", "start"]
