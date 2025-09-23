package handlers

import (
	"net/http"
	"context"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/albertoramos/noted/backend/internal/app/repository"
	"github.com/albertoramos/noted/backend/pkg/models"
)

// NotesHandler handles note-related HTTP requests
type NotesHandler struct {
	notesRepo repository.NotesRepository
}

// NewNotesHandler creates a new notes handler
func NewNotesHandler(notesRepo repository.NotesRepository) *NotesHandler {
	return &NotesHandler{
		notesRepo: notesRepo,
	}
}

// GetNotes handles GET /api/v1/notes
func (h *NotesHandler) GetNotes(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	notes, err := h.notesRepo.GetAll(ctx)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to retrieve notes",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Notes retrieved successfully",
		"data":    notes,
		"count":   len(notes),
	})
}

// CreateNote handles POST /api/v1/notes
func (h *NotesHandler) CreateNote(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	var req models.CreateNoteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
			"details": err.Error(),
		})
		return
	}

	note, err := h.notesRepo.Create(ctx, &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create note",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Note created successfully",
		"data":    note,
	})
}

// GetNote handles GET /api/v1/notes/:id
func (h *NotesHandler) GetNote(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Note ID is required",
		})
		return
	}

	note, err := h.notesRepo.GetByID(ctx, id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Note not found",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Note retrieved successfully",
		"data":    note,
	})
}

// UpdateNote handles PUT /api/v1/notes/:id
func (h *NotesHandler) UpdateNote(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Note ID is required",
		})
		return
	}

	var req models.UpdateNoteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
			"details": err.Error(),
		})
		return
	}

	note, err := h.notesRepo.Update(ctx, id, &req)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Failed to update note",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Note updated successfully",
		"data":    note,
	})
}

// DeleteNote handles DELETE /api/v1/notes/:id
func (h *NotesHandler) DeleteNote(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Note ID is required",
		})
		return
	}

	err := h.notesRepo.Delete(ctx, id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Failed to delete note",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Note deleted successfully",
		"id":      id,
	})
}
