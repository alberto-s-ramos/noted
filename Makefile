# Root Makefile for Noted Project

.PHONY: help generate dev setup clean install-deps

## help: Show this help message
help:
	@echo "Available commands:"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' | sed -e 's/^/ /'

## generate: Generate React Query hooks from OpenAPI spec
generate:
	@echo "Generating React Query hooks from OpenAPI spec..."
	@cd ui && npm run generate-api
	@echo "React Query hooks generated successfully!"

## setup: Initial project setup
setup:
	@echo "Setting up the project..."
	@echo "Installing frontend dependencies..."
	@cd ui && npm install
	@echo "Setup complete!"

## install-deps: Install frontend dependencies
install-deps:
	@echo "Installing frontend dependencies..."
	@cd ui && npm install

## dev: Start development environment
dev:
	@echo "Starting development environment..."
	@echo "Starting backend services..."
	@cd backend && make docker-compose-up
	@echo "Backend started! Frontend can be started with: cd ui && npm run dev"

## dev-frontend: Start only the frontend
dev-frontend:
	@echo "Starting frontend development server..."
	@cd ui && npm run dev

## dev-backend: Start only the backend
dev-backend:
	@echo "Starting backend services..."
	@cd backend && make docker-compose-up

## stop: Stop all services
stop:
	@echo "Stopping all services..."
	@cd backend && make docker-compose-down

## clean: Clean all build artifacts
clean:
	@echo "Cleaning up..."
	@cd backend && make clean
	@cd ui && rm -rf dist node_modules/.cache src/api/generated

## logs: View backend logs
logs:
	@cd backend && make docker-compose-logs

## test: Run all tests
test:
	@echo "Running tests..."
	@cd backend && make test

## build: Build for production
build:
	@echo "🏗️  Building for production..."
	@cd backend && make build
	@cd ui && npm run build
