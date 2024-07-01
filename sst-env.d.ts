/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    Api: {
      name: string
      type: "sst.aws.Function"
      url: string
    }
    DatabaseUrl: {
      type: "sst.sst.Secret"
      value: string
    }
    Web: {
      type: "sst.aws.StaticSite"
      url: string
    }
  }
}
export {}