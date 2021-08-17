dev:
	docker-compose -f docker-compose.dev.yml up

build-dev:
	docker-compose -f docker-compose.dev.yml build

prod:
	docker-compose -f docker-compose.prod.yml up
	
build-prod:
	docker-compose -f docker-compose.prod.yml build
