package internal

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPostgres(url string) (*pgxpool.Pool, error) {
	pool, err := pgxpool.New(context.Background(), url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create connection pool: %v\n", err)
		os.Exit(1)
	}

	return pool, nil
}

func Ping(pool *pgxpool.Pool) error {
	err := pool.Ping(context.Background())
	if err != nil {
		fmt.Println("Unable to ping database")
	}
	return nil
}
