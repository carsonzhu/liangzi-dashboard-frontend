$(aws ecr get-login --no-include-email --region ca-central-1)
docker build -t liangzi-dashboard-frontend .
docker tag liangzi-dashboard-frontend:latest 823715915892.dkr.ecr.ca-central-1.amazonaws.com/liangzi-dashboard-frontend:latest
docker push 823715915892.dkr.ecr.ca-central-1.amazonaws.com/liangzi-dashboard-frontend:latest