const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/action");

async function run() {
  try {
    const octokit = new Octokit();

    const context = github.context;
    const payload = github.context.payload;

    const pullRequestNumber = payload.workflow_run.pull_requests.find(pull => pull.head.ref === payload.workflow_run.head_branch).number

    if (payload.workflow_run.conclusion === "failure") {
      octokit.rest.issues.addLabels({
        ...context.repo,
        issue_number: pullRequestNumber,
        labels: ['PENDING CHECKS', 'NOT READY']
      });
    } else if(payload.workflow_run.conclusion === "success") {
      Promise.all(
        ['PENDING CHECKS', 'NOT READY'].map(label => octokit.rest.issues.removeLabel({
          ...context.repo,
          issue_number: pullRequestNumber,
          name: label
        }))
      );
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
