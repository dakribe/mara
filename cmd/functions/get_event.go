package main

import (
	"context"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type (
	Request  = events.APIGatewayProxyRequest
	Response = events.APIGatewayProxyResponse
)

func Handler(ctx context.Context, r Request) (Response, error) {
	time := time.Now()

	currentTime := time.Format("2006-01-02 15:04:05")
	return Response{
		StatusCode: 200,
		Body:       currentTime,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
