# === Commandes ===

## Démarrer les conteneurs
up:
	docker compose up -d

## Construire les conteneurs avec docker-compose
build:
	docker compose build

## Arrêter les conteneurs
down:
	docker compose down

## Nettoyer (supprime les conteneurs arrêtés + volumes orphelins)
clean:
	docker system prune -f

## Supprimer tous les conteneurs
rm-containers:
	-docker rm -f $$(docker ps -aq) || true

## Supprimer toutes les images
rm-images:
	-docker rmi -f $$(docker images -q) || true

## Supprimer tous les volumes
rm-volumes:
	-docker volume rm $$(docker volume ls -q) || true

## Supprimer tous les réseaux créés par l'utilisateur
rm-networks:
	-docker network rm $$(docker network ls -q) || true

## Supprimer tout
nuke: rm-containers rm-images rm-volumes rm-networks
	docker system prune -af --volumes

