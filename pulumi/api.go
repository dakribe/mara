package main

import (
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/apigatewayv2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type CreateAPIArgs struct {
	ctx           *pulumi.Context
	routeSettings apigatewayv2.StageRouteSettingArray
}

func CreateAPI(args CreateAPIArgs) (*apigatewayv2.Api, error) {
	corsConfig := &apigatewayv2.ApiCorsConfigurationArgs{
		AllowMethods: pulumi.StringArray{
			pulumi.String("GET"),
		},
		AllowOrigins: pulumi.StringArray{
			pulumi.String("*"),
		},
	}

	api, err := apigatewayv2.NewApi(args.ctx, "Mara-Api", &apigatewayv2.ApiArgs{
		ProtocolType:      pulumi.String("HTTP"),
		CorsConfiguration: corsConfig,
	})
	if err != nil {
		return &apigatewayv2.Api{}, nil
	}

	return api, nil
}
