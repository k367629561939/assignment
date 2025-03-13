export const baseFields = [
    "partitionKey",
    "sortKey",
    "username",
    "id",
    "firstName",
    "lastName",
    "dependants",
    "salary",
    "gross",
    "benefitsCost",
    "net"
]

export const employeeFields = [
    ...baseFields,
    "expiration",
]

export const employee = {
    firstName: `PW_test_first_${Date.now()}`,
    lastName: `PW_test_last_${Date.now()}`,
    dependants: 2
}

export const apiPath = "Prod/api/employees"
export const apiPathWithId = (id: string) => `${apiPath}/${id}`

export enum tableColumns {
    'Id',
    'Last Name',
    'First Name',
    'Dependents',
    'Salary',
    'Gross Pay',
    'Benefits Cost',
    'Net Pay',
    'Actions'
}