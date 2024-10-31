# Makefile

# Docker image
NODE_IMAGE := node:20

# Volumes
CLIENT_VOLUME := $(shell pwd)/client:/client
SERVER_VOLUME := $(shell pwd)/server:/server

# Docker container name
CONTAINER_NAME := node-container

# Docker run command
DOCKER_RUN := docker run --rm --user node -v $(CLIENT_VOLUME) -v $(SERVER_VOLUME) --name $(CONTAINER_NAME) -w /client -d $(NODE_IMAGE)

# Init command
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

# Stop any running container
stop:
	@echo "Stopping any running container..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true
