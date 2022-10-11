# pending-checks-label-action

This Github action adds the `PENDING CHECKS` and `NOT READY` labels to a PR when it has failed checks.

Below is an example of how you can set it up.

It works on completion of a workflow run. The `workflows` field should contain the name of the workflow or workflows running your checks.

If the workflow run for the check(s) resulted in failure, then the labels will be added. If you later push any more changes to the PR that result in the checks passing, the labels will be automatically removed.


```
name: Testing Pending Checks Label Action
on:
  workflow_run:
    workflows: [Ruby on Rails CI]
    types:
      - completed

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Pending checks
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        uses: planningcenter/pending-checks-label-action@v0.1.0
```
