import http from "k6/http";
import { check, sleep } from "k6";
import faker from "k6/x/faker";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

const API_HOST = __ENV.API_HOST || "http://localhost:3000";

export const options = {
  stages: [
    { duration: "2m", target: 10 },
    { duration: "5m", target: 10 },
    { duration: "2m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    errors: ["rate<0.1"],
  },
};

export default function () {
  const response = http.get(`${API_HOST}/api/health`);

  const result = check(response, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });

  errorRate.add(!result);

  if (response.status === 200) {
    const readResponse = http.get(`${API_HOST}/api/users`);
    check(readResponse, {
      "read operation successful": (r) => r.status === 200,
    });

    const writePayload = JSON.stringify({
      name: faker.name(),
      email: faker.email(),
    });

    const writeResponse = http.post(
      `${API_HOST}/api/users`,
      writePayload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    check(writeResponse, {
      "write operation successful": (r) => r.status === 201 || r.status === 200,
    });
  }

  sleep(1);
}

export function setup() {
  console.log(`Starting PostgreSQL load test against: ${API_HOST}`);
}

export function teardown() {
  console.log("PostgreSQL load test completed");
}