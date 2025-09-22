package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Ping handles the ping endpoint for health checks
func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
		"status":  "healthy",
	})
}
