import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

export const options = {
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'constant-arrival-rate',
  
        // How long the test lasts
        duration: '30s',
  
        // How many iterations per timeUnit
        rate: 30,
  
        // Start `rate` iterations per second
        timeUnit: '1s',
  
        // Pre-allocate VUs
        preAllocatedVUs: 50,
  
      },
    },
  };

const client = new grpc.Client();
client.load(['definitions'], 'validate.proto');

export default () => {
  client.connect('host.docker.internal:5005', {
    plaintext: true
  });

  const data = {
    messageType: "SampleMessage",
    messageVersion: "v1",
    payload: "{ \"property1\": \"1\", \"property2\": 2 }"
};
  const response = client.invoke('validate.Validator/Validate', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  // console.log(JSON.stringify(response.message));

  client.close();
  // sleep(1);
};
