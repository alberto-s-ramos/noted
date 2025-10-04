package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/albertoramos/noted/backend/pkg/models"
	"github.com/google/uuid"
)

// NotesRepository defines the interface for notes repository
type NotesRepository interface {
	GetAll(ctx context.Context) ([]models.Note, error)
	GetByID(ctx context.Context, id string) (*models.Note, error)
	Create(ctx context.Context, note *models.CreateNoteRequest) (*models.Note, error)
	Update(ctx context.Context, id string, note *models.UpdateNoteRequest) (*models.Note, error)
	Delete(ctx context.Context, id string) error
}

// PostgresNotesRepository implements NotesRepository for PostgreSQL
type PostgresNotesRepository struct {
	db *sql.DB
}

// NewPostgresNotesRepository creates a new PostgreSQL notes repository
func NewPostgresNotesRepository(db *sql.DB) NotesRepository {
	return &PostgresNotesRepository{
		db: db,
	}
}

// GetAll retrieves all notes from the database
func (r *PostgresNotesRepository) GetAll(ctx context.Context) ([]models.Note, error) {
	query := `
		SELECT id, content, created_at, updated_at 
		FROM notes 
		ORDER BY created_at DESC
	`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to query notes: %w", err)
	}
	defer rows.Close()

	var notes []models.Note
	for rows.Next() {
		var note models.Note
		err := rows.Scan(
			&note.ID,
			&note.Content,
			&note.CreatedAt,
			&note.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan note: %w", err)
		}
		notes = append(notes, note)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over notes: %w", err)
	}

	return notes, nil
}

// GetByID retrieves a note by its ID
func (r *PostgresNotesRepository) GetByID(ctx context.Context, id string) (*models.Note, error) {
	query := `
		SELECT id, content, created_at, updated_at 
		FROM notes 
		WHERE id = $1
	`

	var note models.Note
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&note.ID,
		&note.Content,
		&note.CreatedAt,
		&note.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("note with id %s not found", id)
		}
		return nil, fmt.Errorf("failed to get note: %w", err)
	}

	return &note, nil
}

// Create creates a new note in the database
func (r *PostgresNotesRepository) Create(ctx context.Context, req *models.CreateNoteRequest) (*models.Note, error) {
	query := `
		INSERT INTO notes (id, content, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, content, created_at, updated_at
	`

	id := uuid.New().String()
	now := time.Now()

	var note models.Note
	err := r.db.QueryRowContext(
		ctx,
		query,
		id,
		req.Content,
		now,
		now,
	).Scan(
		&note.ID,
		&note.Content,
		&note.CreatedAt,
		&note.UpdatedAt,
	)

	if err != nil {
		return nil, fmt.Errorf("failed to create note: %w", err)
	}

	return &note, nil
}

// Update updates an existing note in the database
func (r *PostgresNotesRepository) Update(ctx context.Context, id string, req *models.UpdateNoteRequest) (*models.Note, error) {
	query := `
		UPDATE notes 
		SET content = COALESCE(NULLIF($3, ''), content),
		    updated_at = $4
		WHERE id = $1
		RETURNING id, content, created_at, updated_at
	`

	now := time.Now()

	var note models.Note
	err := r.db.QueryRowContext(
		ctx,
		query,
		id,
		req.Content,
		now,
	).Scan(
		&note.ID,
		&note.Content,
		&note.CreatedAt,
		&note.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("note with id %s not found", id)
		}
		return nil, fmt.Errorf("failed to update note: %w", err)
	}

	return &note, nil
}

// Delete deletes a note from the database
func (r *PostgresNotesRepository) Delete(ctx context.Context, id string) error {
	query := `DELETE FROM notes WHERE id = $1`

	result, err := r.db.ExecContext(ctx, query, id)
	if err != nil {
		return fmt.Errorf("failed to delete note: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("note with id %s not found", id)
	}

	return nil
}
