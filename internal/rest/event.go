package rest

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/dakribe/mara/internal"
	"github.com/dakribe/mara/internal/service"
	"github.com/go-chi/chi/v5"
)

type EventHandler struct {
	svc service.EventService
}

func NewEventHandler(svc service.EventService) *EventHandler {
	return &EventHandler{
		svc: svc,
	}
}

func (e *EventHandler) Register(r *chi.Mux) {
	r.Post("/events", e.create)
	r.Get("/events", e.list)
}

func (e *EventHandler) create(w http.ResponseWriter, r *http.Request) {
	var params internal.CreateEventParams

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	event, err := e.svc.Create(context.Background(), params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(event)
}

func (e *EventHandler) list(w http.ResponseWriter, r *http.Request) {
	events, err := e.svc.List(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(events)
}
