import cdk = require('@aws-cdk/core');

export interface ServiceStackProps extends cdk.StackProps {

  readonly buildVersion: string;
  readonly deploymentVersion: string;
  
}