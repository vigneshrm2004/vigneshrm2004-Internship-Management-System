pipeline {
    agent any // Specifies that the pipeline will run on any available agent
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/your-fullstack-project.git' // Replace with your repo URL
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                sh 'cd frontend && npm install' // Example for Node.js frontend
            }
        }
        stage('Install Backend Dependencies') {
            steps {
                sh 'cd backend && npm install' // Example for Node.js backend
                // or sh 'mvn install' for Java Maven project
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm run build' // Example build command
            }
        }
        stage('Build Backend') {
            steps {
                sh 'cd backend && node server.js' // Example build command
                // or sh 'mvn package' for Java Maven project
            }
        }
        stage('Test') {
            steps {
                sh 'cd frontend && npm test' // Run frontend tests
                sh 'cd backend && npm test' // Run backend tests
            }
        }
        stage('Deploy') {
            steps {
                // Deployment steps, e.g., using Docker or SSH to transfer files
                // sh 'docker build -t myapp-image .'
                // sh 'docker run -d -p 8080:80 myapp-image'
                echo 'Deploying application...'
            }
        }
    }
}
