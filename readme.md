# Setup

Assumes GRPC server running on grpc://localhost:5005

Expecting payload like:

```
{
    "messageType": "SampleMessage",
    "messageVersion": "v1",
    "payload": "{ \"property1\": \"1\", \"property2\": 2 }"
}
```

# Executing with Docker

`docker run --rm -i -p 5005:5005 -v ${PWD}:/scripts grafana/k6 run --vus 10 --duration 30s /scripts/grpc-test.js`

# Docker Compose

Start influxdb and grafana:

`docker-compose up -d influxdb grafana`

Execute a test:

`docker-compose run --rm k6 run --config /scripts/options.json /scripts/grpc-test.js`

To stop:

`docker-compose down k6-playground`

## Grafana

Go to `http://localhost:3000`

### Adding a Data Source

tbc

### Dashboards

Import gprc dashboard from `./grpc-dashboard.json`

For http tests import `https://grafana.com/dashboards/2587`
