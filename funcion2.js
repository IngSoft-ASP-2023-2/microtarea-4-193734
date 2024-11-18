import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { validatePurchase } from '/opt/nodejs/node_modules/validations.js';

const dynamoClient = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event, context) => {
  const body = JSON.parse(event.body);
  try {
    const cardNumber = body.cardNumber;
    const isValid = validatePurchase(cardNumber);
    if (!isValid) {
      console.log("Entro en not valid")
      const responseBad = {
        statusCode: 400,
        body: JSON.stringify('Error while attempting purchase: Not valid card number'),
      };

      return responseBad;
    }

    const getParams = {
      TableName: "events",
      Key: {
        eventName: { S: body.eventName }
      },
    };
    const eventItem = await dynamoClient.send(new GetItemCommand(getParams));

    const lambdaId = context.awsRequestId;
    if (!eventItem.Item.lambdasIds.L.includes(lambdaId)) {
      console.log("Paso chequeo de no lambdaId")
      console.log("EVENTITEM: " + JSON.stringify(eventItem));
      const eventItemUpdated = {
        eventName: {
          S: eventItem.Item.eventName.S
        },
        availableTickets: {
          N: (eventItem.Item.availableTickets.N - 1)
        },
        ticketFee: {
          N: eventItem.Item.ticketFee.N
        },
        flyer: { S: eventItem.Item.flyer.S },
        lambdasIds: { L: [...eventItem.Item.lambdasIds.L, lambdaId] }
      }
      console.log("PASO UPDATED")
      const putParams = {
        TableName: "events",
        Item: eventItemUpdated,
      }
      console.log("PASO PUT PARAMS")
      console.log("UPDATED: " + JSON.stringify(eventItemUpdated))
      await dynamoClient.send(new PutItemCommand(putParams));
      console.log("Paso el put en dynamo")
      const response = {
        statusCode: 200,
        body: JSON.stringify('Ticket purchased succesfully'),
      };
      console.log("solo queda return")
      return response;
    }
  } catch (error) {
    console.log("ERROR: " + error);
  }
};
