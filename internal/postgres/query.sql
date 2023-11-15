-- name: GetEvent :one
SELECT * FROM events
WHERE id = $1 LIMIT 1;

-- name: ListEvents :many
SELECT * FROM events;

-- name: CreateEvent :one
INSERT INTO events (
  title
) VALUES (
  $1
)
RETURNING *;

-- name: DeleteEvent :exec
DELETE FROM events
WHERE id = $1;
