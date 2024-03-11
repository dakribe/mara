build-lambda:
  GOOS=linux GOARCH=amd64 go build -tags lambda.norpc -o bootstrap cmd/functions/get_event.go

zip-lambda:
  zip handler.zip bootstrap
