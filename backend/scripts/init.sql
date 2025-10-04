-- Database initialization script for Noted application
-- This script will run when the PostgreSQL container starts

-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at);
CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at);

-- Insert some sample data
INSERT INTO notes (content) VALUES 
    ('This is your first note. You can edit or delete it anytime.'),
    ('Here are some tips to get the most out of Noted:\n\n1. Create new notes with the + button\n2. Edit notes by clicking on them\n3. Use markdown for formatting\n4. Notes are automatically saved'),
    ('This is a sample note to demonstrate the application. You can add as much content as you want here.')
ON CONFLICT DO NOTHING;
