import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as synced_folder from "@pulumi/synced-folder";

const config = new pulumi.Config();
const clientBuild = config.get("path") || "../apps/client/dist";

const maraBucket = new aws.s3.Bucket("mara-client-bucket", {
  website: {
    indexDocument: "index.html",
  },
});

const ownershipControls = new aws.s3.BucketOwnershipControls(
  "ownership-controls",
  {
    bucket: maraBucket.bucket,
    rule: {
      objectOwnership: "ObjectWriter",
    },
  },
);

const publicAccessBlock = new aws.s3.BucketPublicAccessBlock(
  "public-access-block",
  {
    bucket: maraBucket.bucket,
    blockPublicAcls: false,
  },
);

const bucketFolder = new synced_folder.S3BucketFolder(
  "synced_folder",
  {
    path: clientBuild,
    bucketName: maraBucket.bucket,
    acl: "public-read",
  },
  { dependsOn: [ownershipControls, publicAccessBlock] },
);

export const originUrl = pulumi.interpolate`http://${maraBucket.websiteEndpoint}`;
export const originHostname = maraBucket.websiteEndpoint;
