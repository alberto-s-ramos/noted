# Makefile for Noted Backend API

.PHONY: help build run test clean deps fmt lint

# Variables
APP_NAME=noted-api
BUILD_DIR=./build
CMD_DIR=./cmd/api
BINARY=$(BUILD_DIR)/$(APP_NAME)

## help: Show this help message
help:
	@echo "Available commands:"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' | sed -e 's/^/ /'

## build: Build the application binary
build:
	@echo "Building $(APP_NAME)..."
	@mkdir -p $(BUILD_DIR)
	go build -o $(BINARY) $(CMD_DIR)

## run: Run the application
run:
	@echo "Running $(APP_NAME)..."
	go run $(CMD_DIR)

## test: Run tests
test:
	@echo "Running tests..."
	go test -v ./...

## test-coverage: Run tests with coverage
test-coverage:
	@echo "Running tests with coverage..."
	go test -v -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html

## deps: Download and verify dependencies
deps:
	@echo "Downloading dependencies..."
	go mod download
	go mod verify

## tidy: Clean up dependencies
tidy:
	@echo "Tidying up dependencies..."
	go mod tidy

## fmt: Format Go code
fmt:
	@echo "Formatting code..."
	go fmt ./...

## lint: Run linters
lint:
	@echo "Running linters..."
	golangci-lint run

## clean: Clean build artifacts
clean:
	@echo "Cleaning up..."
	rm -rf $(BUILD_DIR)
	rm -f coverage.out coverage.html

## install-tools: Install development tools
install-tools:
	@echo "Installing development tools..."
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

## docker-build: Build Docker image
docker-build:
	@echo "Building Docker image..."
	docker build -t $(APP_NAME) .

## docker-run: Run Docker container
docker-run:
	@echo "Running Docker container..."
	docker run -p 8080:8080 --env-file env.example $(APP_NAME)

## docker-compose-up: Start all services with Docker Compose
docker-compose-up:
	@echo "Starting services with Docker Compose..."
	docker-compose up -d

## docker-compose-down: Stop all services
docker-compose-down:
	@echo "Stopping services..."
	docker-compose down

## docker-compose-dev: Start development environment
docker-compose-dev:
	@echo "Starting development environment..."
	docker-compose -f docker-compose.dev.yml up

## docker-compose-logs: View logs from all services
docker-compose-logs:
	@echo "Viewing logs..."
	docker-compose logs -f

## docker-compose-rebuild: Rebuild and restart services
docker-compose-rebuild:
	@echo "Rebuilding and restarting services..."
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
