import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
import ecr = require("@aws-cdk/aws-ecr");

import ssp = require("./service-stack-props");
import { ApplicationLoadBalancer } from "@aws-cdk/aws-elasticloadbalancingv2";

export class ServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: ssp.ServiceStackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, `Vpc`, {
      maxAzs: 2
    });

    const cluster = new ecs.Cluster(this, `Cluster`, {
      vpc: vpc
    });

    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      `Service`,
      {
        cluster: cluster,
        cpu: 256,
        desiredCount: 1,
        taskImageOptions: {
          image: ecs.ContainerImage.fromEcrRepository(
            ecr.Repository.fromRepositoryName(
              this,
              `${id}EcrRepo`,
              "aws-service-ci-cd/service"
            ),
            props.buildVersion
          ),
          environment: {
            DEPLOYMENT_VERSION: props.deploymentVersion
          },
          containerPort: 8080,
        },
        memoryLimitMiB: 512,
        publicLoadBalancer: true,
      }
    );
  }
}
