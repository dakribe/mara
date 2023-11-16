package postgres

import (
	"context"
	"errors"

	"github.com/dakribe/mara/internal"
	"github.com/dakribe/mara/internal/postgres/db"
)

type Event struct {
	q *db.Queries
}

func NewEventRepo(d db.DBTX) *Event {
	return &Event{
		q: db.New(d),
	}
}

func (e *Event) Create(ctx context.Context, params internal.CreateEventParams) (db.Event, error) {
	event, err := e.q.CreateEvent(ctx, params.Title)
	if err != nil {
		return db.Event{}, errors.New("Unable insert event")
	}

	return event, nil
}

func (e *Event) List(ctx context.Context) ([]db.Event, error) {
	events, err := e.q.ListEvents(ctx)
	if err != nil {
		return []db.Event{}, errors.New("Unable to retrieve events")
	}

	return events, nil
}
