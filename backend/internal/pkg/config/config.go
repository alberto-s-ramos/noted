package config

import (
	"os"
)

// Config holds all configuration for our application
type Config struct {
	Port        string
	Environment string
	Database    DatabaseConfig
	CORS        CORSConfig
}

// DatabaseConfig holds database configuration
type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

// CORSConfig holds CORS configuration
type CORSConfig struct {
	AllowedOrigins []string
	AllowedMethods []string
	AllowedHeaders []string
}

// Load returns configuration loaded from environment variables
func Load() *Config {
	return &Config{
		Port:        getEnv("PORT", "8080"),
		Environment: getEnv("ENVIRONMENT", "development"),
		Database: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", ""),
			DBName:   getEnv("DB_NAME", "noted"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
		},
		CORS: CORSConfig{
			AllowedOrigins: []string{
				getEnv("FRONTEND_URL", "http://localhost:5173"),
			},
			AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
		},
	}
}

// getEnv gets an environment variable with a fallback value
func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
