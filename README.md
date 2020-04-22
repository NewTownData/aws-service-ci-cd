# AWS Service

An example AWS service build using Jenkins pipeline.

The service is packaged as a Docker image and published to AWS ECR repository. See `service` folder.

The service is deployed to AWS ECS cluster as a Fargate task via AWS CDK. See `cdk` folder.

## AWS Set Up

### ECR Repository

 * Create a new ECR repository

### AWS Credentials

 * You need to generate a credential pair for API access that needs to be used for Jenkins deployment

## Jenkins Set Up

### Environment Variables

 * `AWS_REGION`, e.g. `eu-west-1`
 * `ECR_REPOSITORY`, e.g. `111111111111.dkr.ecr.eu-west-1.amazonaws.com`

### Credentials

 * `jenkins-aws-secret-key-id` for AWS Secret Key ID
 * `jenkins-aws-secret-access-key` for AWS Secret Access Key

### Multibranch Pipeline AWS Service Build

 * Name: `AWS Service Build`
 * Multibranch pipeline
 * Jenkinsfile: `Jenkinsfile`

### Pipeline AWS Service Deployment

 * Name: `AWS Service Deployment`
 * Pipeline
 * Jenkinsfile: `deployment/Jenkinsfile`

## License

Apache License, Version 2.0. See [LICENSE.txt](LICENSE.txt) for more details.

Copyright 2020 New Town Data Ltd, https://www.newtowndata.com/
