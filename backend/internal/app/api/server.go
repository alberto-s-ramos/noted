package api

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/albertoramos/noted/backend/internal/app/api/handlers"
	"github.com/albertoramos/noted/backend/internal/app/api/middleware"
	"github.com/albertoramos/noted/backend/internal/app/repository"
	"github.com/albertoramos/noted/backend/internal/pkg/config"
	"github.com/albertoramos/noted/backend/internal/pkg/database"
)

// Server represents the API server
type Server struct {
	Router *gin.Engine
	config *config.Config
	db     *database.DB
}

// NewServer creates a new API server
func NewServer(cfg *config.Config, db *database.DB) *Server {
	// Set Gin mode based on environment
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()

	server := &Server{
		Router: router,
		config: cfg,
		db:     db,
	}

	server.setupMiddleware()
	server.setupRoutes()

	return server
}

// setupMiddleware configures the middleware
func (s *Server) setupMiddleware() {
	// Recovery middleware
	s.Router.Use(gin.Recovery())

	// Custom logging middleware
	s.Router.Use(middleware.Logger())

	// CORS middleware
	config := cors.Config{
		AllowOrigins:     s.config.CORS.AllowedOrigins,
		AllowMethods:     s.config.CORS.AllowedMethods,
		AllowHeaders:     s.config.CORS.AllowedHeaders,
		AllowCredentials: true,
	}
	s.Router.Use(cors.New(config))
}

// setupRoutes configures the API routes
func (s *Server) setupRoutes() {
	// Health check endpoint
	s.Router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":      "ok",
			"environment": s.config.Environment,
			"message":     "Noted Backend API is running",
		})
	})

	// Initialize repositories
	notesRepo := repository.NewPostgresNotesRepository(s.db.DB)
	
	// Initialize handlers
	notesHandler := handlers.NewNotesHandler(notesRepo)

	// API v1 routes
	v1 := s.Router.Group("/api/v1")
	{
		// Ping endpoint for testing
		v1.GET("/ping", handlers.Ping)
		
		// Notes endpoints
		notes := v1.Group("/notes")
		{
			notes.GET("", notesHandler.GetNotes)
			notes.POST("", notesHandler.CreateNote)
			notes.GET("/:id", notesHandler.GetNote)
			notes.PUT("/:id", notesHandler.UpdateNote)
			notes.DELETE("/:id", notesHandler.DeleteNote)
		}
	}
}
