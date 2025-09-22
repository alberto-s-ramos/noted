# Noted Backend API

A Go-based REST API for the Noted application, built following the [Standard Go Project Layout](https://github.com/golang-standards/project-layout).

## Project Structure

This project follows the standard Go project layout:

```
backend/
├── cmd/                    # Main applications
│   └── api/               # API server application
│       └── main.go
├── internal/              # Private application code
│   ├── app/              # Application logic
│   │   └── api/          # API handlers, middleware, server
│   └── pkg/              # Internal packages
│       └── config/       # Configuration handling
├── pkg/                  # Public library code
│   └── models/           # Data models
├── api/                  # API definitions (OpenAPI/Swagger)
│   └── openapi.yaml
├── configs/              # Configuration files
│   └── config.yaml
├── docs/                 # Documentation
├── scripts/              # Build and deployment scripts
├── go.mod               # Go module file
├── Makefile            # Build automation
└── README.md
```

## Prerequisites

### Local Development
- Go 1.21 or higher
- Make (optional, for using Makefile commands)

### Docker Development
- Docker
- Docker Compose

## Getting Started

### Option 1: Docker (Recommended for Development)

#### Quick Start with Docker Compose

1. **Start all services** (API + PostgreSQL + Redis):
```bash
cd backend
make docker-compose-up
```

2. **View logs**:
```bash
make docker-compose-logs
```

3. **Stop services**:
```bash
make docker-compose-down
```

#### Development with Hot Reload

For development with automatic code reloading:
```bash
make docker-compose-dev
```

This starts the API with [Air](https://github.com/cosmtrek/air) for hot reloading when you modify Go files.

### Option 2: Local Development

#### 1. Install Dependencies

```bash
cd backend
make deps
```

#### 2. Start Database (Optional)

If you want to use Docker for just the database:
```bash
docker-compose up postgres redis -d
```

#### 3. Run the Application

```bash
make run
```

### Option 3: Docker Only (API)

#### Build and run just the API container:

```bash
# Build the image
make docker-build

# Run the container
make docker-run
```
