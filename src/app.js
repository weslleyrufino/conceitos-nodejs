const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {url, title, techs} = request.body;
  
  const {likes} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);
  
  if(repositoryIndex < 0){
    response.status(400).json("Repository not found");
  }
  
  const repository = {
    id,
    url,
    title,
    techs,
    likes: 0
  }

  if(likes != undefined && likes > 0){
    return response.json(repository);
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex < 0){
    return response.status(400).json("Repository not found.");
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(respository => respository.id == id);

  if(repositoryIndex < 0){
    return response.status(400).json("Repository not found");
  }

  const respository = repositories[repositoryIndex];
  respository.likes += 1;

  return response.status(200).json(respository);
});

module.exports = app;
