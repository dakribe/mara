package main

import (
	"log"
	"net/http"
	"os"

	"github.com/dakribe/mara/cmd/internal"
	"github.com/dakribe/mara/internal/postgres"
	"github.com/dakribe/mara/internal/rest"
	"github.com/dakribe/mara/internal/service"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUrl := os.Getenv("DATABASE_URL")

	db, err := internal.NewPostgres(dbUrl)
	repo := postgres.NewEventRepo(db)
	svc := service.NewEventService(repo)

	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))
	r.Use(middleware.Logger)

	rest.NewEventHandler(*svc).Register(r)

	http.ListenAndServe(":8000", r)
}
