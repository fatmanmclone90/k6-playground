import grpc from 'k6/net/grpc';
import { check } from 'k6';

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

    client.close();
};
