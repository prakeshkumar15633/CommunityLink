pipeline {
    agent any

    environment {
        APP_NAME = "CommunityLink"
        IMAGE = "communitylink-image"
        NAMESPACE = "communitylink-ns"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/prakeshkumar15633/CommunityLink'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${IMAGE}:latest ."
            }
        }

        stage('Apply Kubernetes Manifests') {
            steps {
                withEnv(["KUBECONFIG=C:\\ProgramData\\Jenkins\\.jenkins\\.kube\\config"]) {

                    bat "kubectl apply -f k8s/namespace.yaml"
                    bat "kubectl apply -f k8s/deployment.yaml -n communitylink-ns"
                    bat "kubectl apply -f k8s/service.yaml -n communitylink-ns"
                }
            }
        }
    }

    post {
        success { echo '✅ Build & Deployment Done!' }
        failure { echo '❌ Failed!' }
    }
}
