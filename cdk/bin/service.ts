#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { ServiceStack } from '../lib/service-stack';
import { getEnvVariable } from './env-variables';

const deploymentEnvironment = getEnvVariable('DEPLOYMENT_ENVIRONMENT');
const buildVersion = getEnvVariable('BUILD_VERSION');
const deploymentVersion = getEnvVariable('DEPLOYMENT_VERSION');
const awsRegion = getEnvVariable('AWS_REGION');

const app = new cdk.App();
new ServiceStack(app, `ServiceStack${deploymentEnvironment}`, {
  buildVersion,
  deploymentVersion,
  env: {
    region: awsRegion
  }
});
