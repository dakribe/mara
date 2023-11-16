package service

import (
	"context"
	"errors"

	"github.com/dakribe/mara/internal"
	"github.com/dakribe/mara/internal/postgres"
	"github.com/dakribe/mara/internal/postgres/db"
)

type EventService struct {
	repo *postgres.Event
}

func NewEventService(repo *postgres.Event) *EventService {
	return &EventService{
		repo: repo,
	}
}

func (e *EventService) Create(ctx context.Context, params internal.CreateEventParams) (db.Event, error) {
	event, err := e.repo.Create(ctx, params)
	if err != nil {
		return db.Event{}, errors.New("Unable to create event")
	}

	return event, nil
}

func (e *EventService) List(ctx context.Context) ([]db.Event, error) {
	events, err := e.repo.List(ctx)
	if err != nil {
		return []db.Event{}, errors.New("Unable to list events")
	}

	return events, nil
}
