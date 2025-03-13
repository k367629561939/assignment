# Assignment

## Setup

0. Install yarn
1. Install dependencies `yarn`
2. Install playwright browsers `yarn playwright install`
3. Place login info and API token in `.env` (example `.env.example` contains the environment variables that are required)

4. For performance testing install k6 on your system and make sure it is available in the path

## How to run

### UI and API tests
Run tests: `yarn test`
Run tests in headful mode:`test:headful`

### Performance test
You'll need k6 installed and an authorization token for the api.
`k6 run -e AUTHORIZATION_TOKEN="Basic <INSERT-TOKEN-HERE>" performance/getEmployees.test.js`

## Assumptions, caveats, notes
- would include eslint, prettier, and husky when setting up a project
- leaving failing tests running to show function (would skip and link bug)
- would add test IDs instead of using unreliable locators (text, class, structure)
- .env.example can be automatically copied to .env and filled from a secret manager
- some bugs may be based on lack of specifics, would discuss with colleagues in the know before creating report
- automated test cases are regression/smoke non-exhaustive representation
- file/cookie based login would be preferable to login via username and password for speed