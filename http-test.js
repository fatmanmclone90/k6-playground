import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export default function () {
    const url = 'http://host.docker.internal:6001/validate';
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

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }
