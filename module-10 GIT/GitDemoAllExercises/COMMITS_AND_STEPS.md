# Git Hands-On Lab - Complete Summary

Repository Name:
GitDemoAllExercises

--------------------------------------------------
Exercise 1 - Git Configuration and Initialization
--------------------------------------------------

Commands Used:

git --version
git config --global user.name "Your Name"
git config --global user.email "your_email@gmail.com"
git config --list

git init
git status

Files Created:
- welcome.txt

Commit:

git commit -m "Added welcome.txt file"


--------------------------------------------------
Exercise 2 - .gitignore
--------------------------------------------------

Created:
- .gitignore

Contents:

*.log
logs/

Ignored:
- logs/
- app.log

Commit:

git commit -m "Added .gitignore to ignore log files and folders"

Later Updated:

git commit -m "Updated .gitignore rules"


--------------------------------------------------
Exercise 3 - Branching and Merging
--------------------------------------------------

Branch Created:

git branch GitNewBranch
git checkout GitNewBranch

Files Created:
- branch-info.txt

Commits:

git commit -m "Added branch-info.txt in GitNewBranch"

git commit -m "Updated branch-info.txt with content"

Merged into master:

git checkout master
git merge GitNewBranch

Branch Deleted:

git branch -d GitNewBranch


--------------------------------------------------
Exercise 4 - Merge Conflict Resolution
--------------------------------------------------

Branch Created:

git branch GitWork
git checkout GitWork

File Created:
- hello.xml

Commit:

git commit -m "Added hello.xml in GitWork branch"

Switched to master:

git checkout master

Commit:

git commit -m "Added hello.xml in master branch"

Merge Conflict Created:

git merge GitWork

Conflict Resolved Manually.

Final Commit:

git commit -m "Resolved merge conflict in hello.xml"

Branch Deleted:

git branch -d GitWork


--------------------------------------------------
Exercise 5 - Remote Repository
--------------------------------------------------

Remote Repository:

GitHub Repository:
GitDemoAllExercises

Commands Used:

git remote add origin <repository-url>

git remote -v

git pull origin master

git push -u origin master


--------------------------------------------------
Files Present in Repository
--------------------------------------------------

1. welcome.txt
2. branch-info.txt
3. hello.xml
4. .gitignore
5. COMMITS_AND_STEPS.md

Ignored Files:

- logs/
- *.log


--------------------------------------------------
Useful Verification Commands
--------------------------------------------------

git status
git branch
git log --oneline --graph --decorate --all
git remote -v
git config --list


--------------------------------------------------
Final Outcome
--------------------------------------------------

Successfully completed:

1. Git Configuration
2. Repository Initialization
3. Git Ignore
4. Branching
5. Merging
6. Merge Conflict Resolution
7. Remote Repository Setup
8. GitHub Push and Pull

All exercises were completed successfully in a single repository.