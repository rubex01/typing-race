init: destroy
	@echo "Initializing project..."
	docker run \
      --rm \
      --user node \
      --volume ./client:/client \
      --volume ./server:/server \
      --name typing-race-init \
      --workdir /client \
      --detach \
      node:20 \
      tail -f /dev/null
	docker exec typing-race-init bash -c "cd /client && [ -f .env ] || cp .env.example .env"
	docker exec typing-race-init bash -c "cd /server && [ -f .env ] || cp .env.example .env"
	docker exec typing-race-init bash -c "cd /client && npm install"
	docker exec typing-race-init bash -c "cd /server && npm install"
	docker stop typing-race-init || true
	docker rm typing-race-init || true
	docker compose up -d
	docker compose exec -it server npm run migrate
	docker compose exec -it server npm run generate

destroy:
	@echo "Stopping any running container..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

up:
	docker compose up -d

stop:
	docker compose stop

e2e:
	COMMAND='npm run dev:e2e' docker compose up -d
	docker run --rm \
	  --env CYPRESS_baseUrl=http://app:5173 \
	  --volume ./client:/e2e \
  	  --network typing-race_typing-race \
	  --volume /tmp/.X11-unix:/tmp/.X11-unix \
	  --workdir /e2e \
	  --entrypoint cypress \
	  --name cypress \
	  cypress/included:latest run
	docker compose up -d

unit:
	docker compose exec app npm run test
	docker compose exec server npm run test

ssh:
	docker compose exec app /bin/bash

migrate:
	docker compose exec server npm run migrate
