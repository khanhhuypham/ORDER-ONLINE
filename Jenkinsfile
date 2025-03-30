// @Library('pipeline-library-overatevntech')_

// def serviceEnum = 8111
// def serviceInfo = getServiceInfo(serviceEnum)
// def gitCommitInfo

// pipeline {
//     agent any
    
//     stages {
//         stage("Prepare GIT information") {
//             steps {
//                 script {
//                     gitCommitInfo = getGitCommitInfo()
//                 }
//             }
//         }
//         stage("Build image and push registry") {
//             steps {
//                 script {
//                     buildDockerImage(serviceInfo)
//                 }
//             }
//         }
//         stage("Deploy service") {
//             steps {
//                 script {
//                     deployService(serviceInfo)
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             script {
//                 sendResultEmail.successPost(serviceInfo, gitCommitInfo)
//             }
          
//         }
//         failure {
//             script {
//                 sendResultEmail.failurePost(serviceInfo, gitCommitInfo)
//             }
//         }
//     }
// }