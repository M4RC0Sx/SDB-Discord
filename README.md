# SDB-Discord

DiscordJS bot made for @shinchandelbarrio's official Discord server.

### Installation:

1. Install Docker on your host machine.
2. Get latest image from Docker Hub:

```sh
docker pull m4rc0sx/sdb-discord:latest
```

3. Create a .env file following **.env.example** template.
4. Run a container with the pulled image and using the .env file you just created:

```sh
docker run -d --restart unless-stopped --env-file .env m4rc0sx/sdb-discord:latest
```
