const express = require("express");
const cors = require("cors");

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;


  const repository = {
    id: uuid(),
    title,
    url,
    techs ,
    likes:0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(r => r.id == id)

  if(repositoryIndex <0){
    return response.status(400).send({'error':'repository does not exists'})
  }

  const newRepository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }

  
  repositories[repositoryIndex] = newRepository 

  return response.json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(r => r.id ==id);
  if(repositoryIndex >= 0){
    repositories.splice(repositoryIndex, 1)
  }else{
    return response.status(400).json({error:'Repository does not exists'})
  }
  
  return response.status(204).send('Deletado com sucesso')
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositorioIndex = repositories.findIndex(r => r.id === id );
  if(repositorioIndex === -1){
    return response.status(400).json({ error: 'Repository does not exits.' })
  };

  repositories[repositorioIndex].likes++

  return response.json(repositories[repositorioIndex])
});



module.exports = app;
