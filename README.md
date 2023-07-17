# sb-focus.api

This is the backend API of [sb-focus](). A task manager inspired by Microsoft Todo. It is coupled with a ReactJS Front End that you can find [here]().

## 🚀 Getting started

- Don't forget to add your environment variables in a .env file.
- You can either use this app with or without docker.

### Docker

- This repo contains a Dockerfile to create the docker image and a docker-compose.yml file that runs a container composed of two images :
  - the api
  - mongo:6.0.8
- The database configures itself to create the necessary database and credentials. You just have to make sur your environment varaibles are set.

### Without Docker

- Make sure you have a mongodb server running with credentials and a database for sbfocus.
- run the following command to install packages :

```bash
npm install
```

- start the development server :

```bash
npm run develop
```

This project is under GPLv3 license. Please take in into account when using this code.
