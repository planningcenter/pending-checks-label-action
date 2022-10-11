const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/action");

async function run() {
  try {
    const octokit = new Octokit();

    const context = github.context;
    const payload = github.context.payload;

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
