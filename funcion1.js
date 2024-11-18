import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new S3Client();
const dynamoClient = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    const bucketObject = await client.send(new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    }));

    const getParams = {
      TableName: "events",
      Key: {
        eventName: { S: key }
      },
    };
    const eventItem = await dynamoClient.send(new GetItemCommand(getParams));

    const flyer = await bucketObject.Body.transformToString("base64");

    const eventItemWithFlyer = {
      eventName: {
        S: eventItem.Item.eventName.S
      },
      availableTickets: {
        N: eventItem.Item.availableTickets.N
      },
      ticketFee: {
        N: eventItem.Item.ticketFee.N
      },
      lambdasIds: {
        L: eventItem.Item.lambdasIds.L
      },
      flyer: { S: flyer }
    }
    
    const putParams = {
      TableName: "events",
      Item: eventItemWithFlyer
    }
    await dynamoClient.send(new PutItemCommand(putParams));
  } catch (error) {
    console.log("ERROR: " + error);
  }
};
