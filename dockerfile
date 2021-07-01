FROM ubuntu:latest
RUN apt-get update &&\ 
    apt-get install -y &&\
    apt-get install python3 -y &&\
    apt-get install nginx -y &&\
    apt install python3-pip -y
COPY ec2-details/build /var/www/html
COPY scheduler /scheduler
RUN pip3 install -r scheduler/requirements.txt
CMD  /etc/init.d/nginx restart && python3 scheduler/Retrieve_EC2.py


