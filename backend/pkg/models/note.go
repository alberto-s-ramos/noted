package models

import (
	"time"
)

// Note represents a note in the system
type Note struct {
	ID        string    `json:"id" db:"id"`
	Title     string    `json:"title" db:"title"`
	Content   string    `json:"content" db:"content"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// CreateNoteRequest represents the request payload for creating a note
type CreateNoteRequest struct {
	Title   string `json:"title" binding:"required"`
	Content string `json:"content" binding:"required"`
}

// UpdateNoteRequest represents the request payload for updating a note
type UpdateNoteRequest struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}
