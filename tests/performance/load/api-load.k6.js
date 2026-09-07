import http from "k6/http";
import { check, sleep } from "k6";
export const options = {
  vus: 5,
  duration: "10s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};
export default function () {
  const response = http.get(
    __ENV.API_BASE_URL || "http://localhost:3000/health",
  );
  check(response, {
    "status is 200": (r) => r.status === 200,
    "response status is ok": (r) => r.json("status") === "ok",
  });
  sleep(1);
}
