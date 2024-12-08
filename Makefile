# Docker image
NODE_IMAGE := node:20
# Volumes
CLIENT_VOLUME := $(shell pwd)/client:/client
SERVER_VOLUME := $(shell pwd)/server:/server
# Docker container name
CONTAINER_NAME := node-container
# Docker run command
DOCKER_RUN := docker run --rm --user node -v $(CLIENT_VOLUME) -v $(SERVER_VOLUME) --name $(CONTAINER_NAME) -w /client -d $(NODE_IMAGE)

init: stop
	@echo "Starting Docker container..."
	$(DOCKER_RUN) tail -f /dev/null
	@echo "Running npm install in /client..."
	docker exec $(CONTAINER_NAME) bash -c "cd /client && npm install"
	@echo "Running npm install in /server..."
	docker exec $(CONTAINER_NAME) bash -c "cd /server && npm install"
	@echo "Starting containers with docker-compose..."
	docker compose up -d
	@echo "Stopping and removing the initialization container..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

stop:
	@echo "Stopping any running container..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

up:
	docker compose up -d

e2e:
	docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d socketio app
	docker-compose -f docker-compose.yml -f docker-compose.test.yml up cypress
	docker-compose up -d

unit:
	docker compose exec app npm run test

ssh:
	docker compose exec app /bin/bash