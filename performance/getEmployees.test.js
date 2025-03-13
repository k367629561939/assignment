import http from 'k6/http';
import { check } from 'k6';

const API_PATH = 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees';
const authToken = __ENV.AUTHORIZATION_TOKEN

export const options = {
    scenarios: {
        ramping_arrival: {
            executor: 'ramping-arrival-rate',
            startRate: 0,
            timeUnit: '1s',
            preAllocatedVUs: 5,
            maxVUs: 20,

            stages: [
                { duration: '1m', target: 10 }, // Ramp up from 0 to 10 RPS in 1 minute
                { duration: '1m', target: 10 }, // Maintain 10 RPS for 1 minute
            ],
        },
    },
}

export function setup() {
    if (!authToken) {
        throw new Error('No authorization token provided! Please set the AUTHORIZATION_TOKEN environment variable.');
    }
}

export default function () {
    const res = http.get(API_PATH, { headers: { 'Authorization': authToken } });
    check(res, {
        'is status 200': (r) => r.status === 200,
    });
}