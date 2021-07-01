Purpose - Simple react app to display EC2 instance details across multiple regions

Useful commands
-------------------
docker build -t <image name>:<tag> .
docker run -d -e server='local' -e aws_access_key_id='ABC' -e aws_secret_access_key='DEF' -p 8080:80 <image name>

if you are running in AWS ECS and it has appropriate role attached then use,
docker run -d -e server='aws' -p 8080:80 <image name>


Developer - K.Janarthanan