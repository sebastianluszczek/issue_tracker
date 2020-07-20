# IssueTracker

>Simple full stack application connecting Node.js backend, MongoDB database and React.js frontend. Everythink is connected via docker-compose, and developed using docker (server & client have 'hot reload' thanks to docker volumes).

---

## In project i use:

### Backend
<p style="float: left">
<img src="https://cdn.iconscout.com/icon/free/png-256/node-js-1174925.png" alt="Node.js" width="64" style="display: inline">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS88qsrd0PXJzWBK2MYRgBWchcs-LMBYwBncfMuLDlAWjHbUXvGIw" alt="Express" width="64" style="display: inline">
<img src="https://pbs.twimg.com/profile_images/946432748276740096/0TXzZU7W.jpg" alt="Mongoose" width="64" style="display: inline">
</p><div style="clear:both;"></div>


### Frontend
<img src="https://cdn.iconscout.com/icon/free/png-256/react-4-1175110.png" alt="React.js" width="64" style="display: inline">

### Database

<img src="https://cdn.iconscout.com/icon/free/png-256/mongodb-4-1175139.png" alt="MongoDB" width="64" style="display: inline">


### Development

<img src="https://cdn.iconscout.com/icon/free/png-256/docker-226091.png" alt="MongoDB" width="64" style="display: inline">


---

## Build Setup

```bash
# build development environment with docker-compose
docker-compose up --build

```


## ToDo

Stuff to implement:

- authentication (might be another microservice with with database, responsible for registration & logging users, with endpoint to check JWT);
- frontend client might have feature to search issues by name;
- production versions of Dockerfiles & docker-compose.yml;
- better tests;
