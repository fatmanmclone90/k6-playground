import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const url = 'http://host.docker.internal:5001/validate';
    const payload = JSON.stringify({
        messageType: "SampleMessage",
        messageVersion: "v1",
        payload: "{ \"property1\": \"1\", \"property2\": 2 }"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const result = http.post(url, payload, params);

    check(result, {
        'is status 200': (r) => r.status === 200,
    });
}
