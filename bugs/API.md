1. Wrong body in Add employee request results in 405 response
2. Get or delete of non-existent user returns 200, expecting 404
3. 500 error with invalid ID for get (shorten UUID)
4. Update of non-existent employee creates a new employee with no salary
5. Inputs are not sanitised, <button>ClickMe</button> is considered valid input for name
6. Update can set salary (missing from spec or bug)

## Example Bug Report

### Summary
Update of non-existent employee creates a new employee with no salary

### Steps to Reproduce
1. Send API request with 
2. Step two to reproduce the bug.
3. Additional steps as necessary.

### Expected Results
Update fails returning 404

### Actual Results
Update succeeds and a new user is created

### Request
{
    "id": "059a1062-da37-46c5-aa06-24337a7616c3",
    "firstName": "ktest222",
    "lastName": "ktest222"
}

### Response
{
    "partitionKey": "TestUser734",
    "sortKey": "e8e77f13-c74e-44e0-8d5a-6521fa81cf01",
    "username": "TestUser734",
    "id": "e8e77f13-c74e-44e0-8d5a-6521fa81cf01",
    "firstName": "ktest222",
    "lastName": "ktest222",
    "dependants": 0,
    "salary": 0,
    "gross": 0,
    "benefitsCost": 38.46154,
    "net": -38.46154
}