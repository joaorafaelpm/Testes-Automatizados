// The 'pipeline' block is the mandatory root element that tells Jenkins this is a Declarative Pipeline.
pipeline {
    // 'agent any' instructs Jenkins to allocate any available executor (node) to initialize the pipeline.
    agent any

    // The 'tools' section auto-installs or activates tools. Here, it sets up NodeJS (configured as "node" in Jenkins Global Tools).
    tools {nodejs "node"}

    // The 'stages' block is a container for all the sequential stages (phases) of your pipeline.
    stages {
        // Defines a logical stage named 'Cypress Parallel Test Suite' to group and visualize the work in the Jenkins UI.
        stage('Cypress Parallel Test Suite') {
            // The 'parallel' directive indicates that the stages nested inside it should run simultaneously, saving time.
            parallel {
                // Defines a specific parallel branch/stage named 'Slave Node 1'.
                stage('Slave Node 1') {
                    // Overrides the global 'agent any' to run this specific stage on a specific machine configuration.
                    agent {
                        // 'label' targets a specific Jenkins agent/node that has the label "remote_node1".
                        label "remote_node1"
                    }
                    // The 'steps' block contains the actual commands/tasks to be executed in this stage.
                    steps {
                        steps {
                        git branch: 'main', url: 'https://github.com/joaorafaelpm/Automation-Tests'
                        // Executes a Windows batch command to install the dependencies listed in package.json.
                        bat 'npm install'
                        // Executes a batch command to update the dependencies to their latest allowed versions.
                        bat 'npm update'
                        // Executes the specific Cypress test script defined in the 'scripts' section of your package.json.
                        bat 'npm run triggerAllTests-autoTestStore-dashboard'
                    }
                }
                stage('Slave Node 2') {
                    agent {
                        label "remote_node2"
                    }
                    steps {
                        steps {
                        git branch: 'main', url: 'https://github.com/joaorafaelpm/Automation-Tests'
                        bat 'npm install'
                        bat 'npm update'
                        bat 'npm run triggerAllTests-autoTestStore-dashboard'
                    }
                }
            }
        }
    }
}