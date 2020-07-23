layout: post
title: Git-Workflow
description: Good workflow when working with releases in a project
date: 2015-02-12
author: Jonas Colmsjo
tags: ['post','git']


Overview

This workflow for git was developed by Vincent Driessen at
[nvie](http://nvie.com).

Branches:

 * `master branch` - contains releases, often with a tag for each commit
 * `development branch` - features are merged into this branch before release
 * `feature branches`


1. Setup develop branch

      `git branch develop`

      `git push -u origin develop`

2. Other developers should clone the repo and do

      `git checkout -b develop origin/develop`

3. Now create a feature

      `git checkout -b some-feature develop`

4. Add some stuff to this feature


      `echo "This is a nice feature" > some-feature`

      `git add some-feature`

      `git commit`


5. Now checkout the develop branch and see that it doesn't contain the new feature

      `git checkout develop`

      `ls`

6. Let's merge the feature branch with develop

      `git merge some-feature`

      `ls`

7. Then delete the feature branch (which now is part of develop)

      `git branch -d some-feature`


8. The process for merging develop with master is exactly the same. The develop
branch is not deleted though.

Whenever something is merged into master should a tag be created:

`git tag -a 0.1 -m "Initial public release" master`

`git push --tags`


9. Delete a remote branch: `git push origin --delete <branchName>`
or like this: `git push origin :<branchName>`



Resources

 * [Comparing Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
 *  [nvie post](http://nvie.com/posts/a-successful-git-branching-model/)
