# Farm Shop Project

A modern e-commerce platform for farm products with a microservices architecture.

## Overview

This project is a farm shop application that allows customers to browse and purchase farm products. It's built with Node.js and Express, uses PostgreSQL for data storage, and includes both a backend API and a microservice architecture.

## Quick Start

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The API will be available at http://localhost:3001

### Using Docker Compose

For a quick setup with Docker:

```bash
docker-compose up
```

This will start both the API and PostgreSQL database.

## Database Setup

The project uses PostgreSQL with the following default configuration:
- Database: farmshop
- Username: farmshop
- Password: farmshop
- Port: 5432

To initialize the database with sample data:
```bash
node seed.js
```

## Testing

Run the test suite:
```bash
npm test
```

## Deployment

### Kubernetes Deployment

The application can be deployed to Kubernetes using the manifests in the `k8s` directory:

```bash
kubectl apply -f k8s/
```

### CI/CD Pipeline

The project includes:
- GitHub Actions workflow for continuous integration
- Jenkins pipeline for continuous deployment
- Automated testing and Docker image building

## Project Structure

```
├── __tests__/          # Test files
├── k8s/               # Kubernetes manifests
├── jenkins/           # Jenkins pipeline configuration
├── database.js        # Database configuration
├── index.js          # Main application entry
└── seed.js           # Database seeding script
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
