'''
+ Date - 28/6/2021
+ Developer - K.Janarthanan
+ Purpose
- This script is used to obtain the details of EC2 across the specified region and output the data in JSON file
- State running will be mapped to 'On'; State stopped/terminated will be mapped to 'Off'; All other remaining state will be mapped to 'Pending' 
'''

from config import AWS_REGIONS,OUT_JSON_PATH,SCHEDULE_INTERVAL
import boto3
import os
import logging
from botocore.exceptions import ClientError
import json
import datetime
import schedule
import time

logging.basicConfig(format="%(asctime)s :: [%(module)s] :: [%(levelname)s] :: %(message)s",level="INFO")
logger = logging.getLogger('log')

def get_state(ec2_state):
    
    if(ec2_state == "running"):
        return "On"
    elif((ec2_state == "stopped") or (ec2_state == "terminated")):
        return "Off"
    else:
        return "Pending"

def prepare_json(final_data):
    try:
        logger.info("Stated to write into JSON")

        with open(OUT_JSON_PATH,'w',encoding='utf-8') as f:
            json.dump(final_data,f,ensure_ascii=False,indent=4)

        logger.info("Completed creating file")

    except Exception as e:
        logger.error(f"Error while creating JSON file : {e}")

def get_ec2_details():
    #Main function
    try:

        if (os.getenv("server") == "local"):
            logger.info("Server is local therefore, getting credentials from env variable")
            aws_access_key_id = os.getenv("aws_access_key_id")
            aws_secret_access_key = os.getenv("aws_secret_access_key")

        elif(os.getenv("server") == "aws"):
            logger.info("Server is aws, therefore will fetch credentials from role attached")

        else:
            raise Exception ("server value is wrong. Only local and aws is allowed")
            
        all_data = []

        for region in AWS_REGIONS:

            logger.info(f"Working on Region : {region}")
            ec2client = boto3.client('ec2', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key,region_name=region)
        
            response = ec2client.describe_instances()

            if(len(response['Reservations']) > 0):

                for i in range(len(response['Reservations'])):

                    if(len(response['Reservations'][i]['Instances']) > 0):

                        EC2_data = {}
                        EC2_data["Region"] = region

                        logger.info(f"Found {len(response['Reservations'][0]['Instances'])} EC2 in the region {region}")

                        EC2_data["ID"] = response['Reservations'][i]['Instances'][0]['InstanceId']
                        EC2_data["Size"] = response['Reservations'][i]['Instances'][0]['InstanceType']
                        EC2_data["AZ"] = response['Reservations'][i]['Instances'][0]['Placement']['AvailabilityZone']
                        EC2_data["State"] = get_state(response['Reservations'][i]['Instances'][0]['State']['Name'])

                        all_data.append(EC2_data)

                    else:
                        logger.info(f"No any EC2 found in the region {region}")
            else:
                logger.info(f"No any EC2 found in the region {region}")

            
        final_data ={}
        final_data["Date"] = str(datetime.datetime.now().strftime("%a %m-%d-%Y %H:%M:%S"))
        final_data["Details"] = all_data 

        logger.info(f"Final data : {final_data}")
        prepare_json(final_data)

    except Exception as e:
        logger.error(f"Error in main function: {e}")

#Start
get_ec2_details()
schedule.every(SCHEDULE_INTERVAL).minutes.do(get_ec2_details)

while (True):
    schedule.run_pending()
    time.sleep(1)