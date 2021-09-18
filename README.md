## Lock package.json version with yarn
### remove (^) or (~) in package.json

### Two steps to excute
- Write in package.json > script
    ```lockVersion": "yarn list --depth=0 --json > currentVersion.json && node lockVersion"```

- Terminal RUN
    ```node lockVersion.js```
