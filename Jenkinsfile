def cdkRepositoryName = 'aws-service-ci-cd/cdk'
def serviceRepositoryName = 'aws-service-ci-cd/service'
def publishBranch = 'origin/master'

pipeline {
  agent none

  options { 
    disableConcurrentBuilds() 
  }

  environment {
    BUILD_VERSION = "v1.0.${env.BUILD_NUMBER}-${env.BRANCH_NAME}"
    AWS_ACCESS_KEY_ID = credentials('jenkins-aws-secret-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
  }
  
  stages {
    stage('Build CDK') {
      agent {
        docker { image 'node:12-alpine' }
      }
      steps {
        dir('cdk') {
          sh "npm install"
          sh "npm run build"
        }
      }
    }
    stage('Build Service') {
      agent {
        docker { image 'node:12-alpine' }
      }
      steps {
        dir('service') {
          sh "npm install"
        }
      }
    }
    stage('Build CDK Docker Image') {
      agent any
      steps {
        sh "docker build --no-cache -t ${cdkRepositoryName}:${env.BUILD_VERSION} --build-arg BUILD_VERSION=${env.BUILD_VERSION} cdk"
        sh "docker tag ${cdkRepositoryName}:${env.BUILD_VERSION} ${env.ECR_REPOSITORY}/${cdkRepositoryName}:${env.BUILD_VERSION}"
      }
    }
    stage('Build Service Image') {
      agent any
      steps {
        sh "docker build --no-cache -t ${serviceRepositoryName}:${env.BUILD_VERSION} --build-arg BUILD_VERSION=${env.BUILD_VERSION} service"
        sh "docker tag ${serviceRepositoryName}:${env.BUILD_VERSION} ${env.ECR_REPOSITORY}/${serviceRepositoryName}:${env.BUILD_VERSION}"
      }
    }
    stage('Publish Artifacts') {
      when {
        branch 'master'
      }
      agent any
      steps {
        sh "aws ecr get-login --no-include-email --region ${env.AWS_REGION} | bash"
        sh "docker push ${env.ECR_REPOSITORY}/${cdkRepositoryName}:${env.BUILD_VERSION}"
        sh "docker push ${env.ECR_REPOSITORY}/${serviceRepositoryName}:${env.BUILD_VERSION}"
      }
    }
    stage('Run Deployment') {
      when {
        branch 'master'
      }
      steps {
        build job: 'AWS Service Deployment', 
          parameters: [
            string(name: 'BUILD_VERSION', value: env.BUILD_VERSION)
          ]
      }
    }
  }

  post {
    cleanup {
      // select any agent
      node(null) {
        // remove created images
        sh "docker rmi ${cdkRepositoryName}:${env.BUILD_VERSION} || true"
        sh "docker rmi ${env.ECR_REPOSITORY}/${cdkRepositoryName}:${env.BUILD_VERSION} || true"
        sh "docker rmi ${serviceRepositoryName}:${env.BUILD_VERSION} || true"
        sh "docker rmi ${env.ECR_REPOSITORY}/${serviceRepositoryName}:${env.BUILD_VERSION} || true"
        cleanWs()
      }
    }
  }
}
