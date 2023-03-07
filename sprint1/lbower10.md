# Sprint 1
Logan Bowers

lbower10

Dynprog

### What you planned to do
* Bridge front-end and back-end
* Verify user email
* Hash user passwords

### What you did not do
* The front and back end are not entirely briged just yet. We may need to look into a bundling service so that our front end may be able to utilize our node modules.
* Due to our front and back end not being entirely bridged yet, code for verifying users and hashing their passwords cannot be fully utilized at this time.
* My code for creating user accounts would still store the user locally, rather than integrate with and be stored in our sqlite database.

### What problems you encountered
* As aforementioned, we encountered a problem with our front end being able to use our node modules. Need to figure out how to bundle the js files and allow front end to utilize these modules.

### Issues worked on
* Bridge front and back end -> [Issue #17](https://github.com/utk-cs340-spring23/DynProg/issues/17)
* Verify user email -> [Issue #16](https://github.com/utk-cs340-spring23/DynProg/issues/16)
* Hash user passwords -> [Issue #15](https://github.com/utk-cs340-spring23/DynProg/issues/15)

### Files you worked on
* main.js, which contains the server code that currently hosts our website.
* passport-config.js, which houses the code that handles user authentication/login error checking

### What you accomplished
* I was able to successfully host our project website
* Logic that will hash passwords and allow user creation/authentication was added, but will likely need to be refactored and will need to be integrated with our database.