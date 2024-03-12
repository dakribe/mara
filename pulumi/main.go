package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/apigatewayv2"
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/iam"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		lambdaRole, err := iam.NewRole(ctx, "task-exec-role", &iam.RoleArgs{
			AssumeRolePolicy: pulumi.String(`{
				"Version": "2012-10-17",
				"Statement": [{
					"Sid": "",
					"Effect": "Allow",
					"Principal": {
						"Service": "lambda.amazonaws.com"
					},
					"Action": "sts:AssumeRole"
				}]
			}`),
		})

		_, err = MaraDB(ctx)
		if err != nil {
			return err
		}

		_, err = iam.NewRolePolicy(ctx, "lambdaRolePolicy", &iam.RolePolicyArgs{
			Role: lambdaRole.Name,
			Policy: pulumi.String(`{
				"Version": "2012-10-17",
				"Statement": [{
					"Action": [
							"dynamodb:GetItem",
							"dynamodb:PutItem",
							"dynamodb:UpdateItem",
							"dynamodb:DeleteItem"
					],
					"Effect": "Allow",
					"Resource": "*"
				}]
			}`),
		})
		if err != nil {
			return err
		}

		testFunction, err := CreateFunction(CreateFunctionArgs{
			ctx:  ctx,
			name: "testFunction",
			role: lambdaRole,
			code: pulumi.NewFileArchive("../handler.zip"),
		})
		if err != nil {
			return err
		}

		api, err := CreateAPI(CreateAPIArgs{
			ctx: ctx,
		})
		if err != nil {
			return err
		}

		testRoute, err := CreateApiRoute(ctx, api, ApiRouteArgs{
			function:  testFunction,
			routeKey:  pulumi.String("GET /"),
			routeName: "test",
		})
		if err != nil {
			return nil
		}

		_, err = apigatewayv2.NewStage(ctx, "dev", &apigatewayv2.StageArgs{
			ApiId:      api.ID(),
			Name:       pulumi.String("dev"),
			AutoDeploy: pulumi.Bool(true),
			RouteSettings: apigatewayv2.StageRouteSettingArray{
				&apigatewayv2.StageRouteSettingArgs{
					RouteKey:             testRoute.RouteKey,
					ThrottlingRateLimit:  pulumi.Float64(1000.00),
					ThrottlingBurstLimit: pulumi.Int(5000),
				},
			},
		})
		if err != nil {
			return err
		}

		apiUrl := pulumi.Sprintf("%s/dev/", api.ApiEndpoint)
		ctx.Export("API Endpoint: ", apiUrl)

		return nil
	})
}
