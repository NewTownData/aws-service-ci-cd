#!/bin/sh
CDK=./node_modules/aws-cdk/bin/cdk
npm install
npm run build
$CDK synth
$CDK deploy
