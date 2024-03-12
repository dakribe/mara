package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/dynamodb"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func MaraDB(ctx *pulumi.Context) (*dynamodb.Table, error) {
	db, err := dynamodb.NewTable(ctx, "mara-table", &dynamodb.TableArgs{
		Name:        pulumi.String("events"),
		BillingMode: pulumi.String("PAY_PER_REQUEST"),
		HashKey:     pulumi.String("eventId"),
		RangeKey:    pulumi.String("title"),
		Attributes: dynamodb.TableAttributeArray{
			&dynamodb.TableAttributeArgs{
				Name: pulumi.String("eventId"),
				Type: pulumi.String("S"),
			},
			&dynamodb.TableAttributeArgs{
				Name: pulumi.String("title"),
				Type: pulumi.String("S"),
			},
		},

		Tags: pulumi.StringMap{
			"Name":        pulumi.String("mara-table"),
			"Environment": pulumi.String("prod"),
		},
	})
	if err != nil {
		return &dynamodb.Table{}, nil
	}

	return db, nil
}
