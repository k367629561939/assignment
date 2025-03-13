import { test, expect } from '@playwright/test'
import { employeeFields, employee, baseFields, apiPath, apiPathWithId } from '../../helpers/constants'
import { getEnvVar } from '../../helpers/envVars'
import { addEmployee, deleteEmployee } from '../../endpoints/api'

test.describe.only('Employee API tests', () => {
    test.use({ extraHTTPHeaders: { 'Authorization': getEnvVar('AUTHORIZATION_TOKEN'), } })

    test('Get all employees', async ({ request }) => {
        const response = await request.get(apiPath)
        expect(response.status()).toBe(200)
        const jsonData = await response.json()
        employeeFields.forEach((field) => {
            for (const employee of jsonData) {
                expect(employee).toHaveProperty(field)
            }
        })
    })

    test('Add employee', async ({ request }) => {
        const response = await addEmployee(request, employee)
        expect(response.status()).toBe(200)
        const jsonData = await response.json()
        baseFields.forEach((field) => {
            expect(jsonData).toHaveProperty(field)
        })
    })

    const invalidEmployees = [
        { firstName: 'a'.repeat(51), lastName: 'Doe', dependants: 2 },
        { firstName: 'John', lastName: 'b'.repeat(51), dependants: 2 },
        { firstName: 'Jane', lastName: 'Doe', dependants: 33 },
        { firstName: '', lastName: 'Doe', dependants: 2 },
        { firstName: 'John', lastName: '', dependants: 2 },
        { firstName: 'John', lastName: 'Doe', dependants: -1 },
    ]

    invalidEmployees.forEach((employee, index) => {
        test(`Add invalid employee ${index + 1}`, async ({ request }) => {
            const response = await addEmployee(request, employee)
            expect(response.status()).toBe(400)
        })
    })

    test('Get wrong employee id', async ({ request }) => {
        const response = await request.get(apiPathWithId('some-id'))
        expect(response.status()).toBe(404)
        expect(await response.json()).toBeEmpty()
    })

    test.describe('Existing employee actions', () => {
        var id: string

        test.beforeEach('Create test user', async ({ request }) => {
            const response = await addEmployee(request, employee)
            expect(response.status()).toBe(200)
            const jsonData = await response.json()
            id = jsonData.id
        })

        test.afterEach('Delete test user', async ({ request }) => {
            const response = await request.delete(apiPathWithId(id))
            expect(response.status()).toBe(200)
        })

        test('Get employee by id', async ({ request }) => {
            const response = await request.get(apiPathWithId(id))
            expect(response.status()).toBe(200)
            const jsonData = await response.json()
            employeeFields.forEach((field) => {
                expect(jsonData).toHaveProperty(field)
            })
        })

        test('Update employee', async ({ request }) => {
            const response = await request.put(apiPath, {
                data: {id: id, firstName: 'newName', lastName: 'newLastName' }
            })
            expect(response.status()).toBe(200)
            const jsonData = await response.json()
            expect(jsonData.firstName).toBe('newName')
            baseFields.forEach((field) => {
                expect(jsonData).toHaveProperty(field)
            })
        })

        test('Delete employee', async ({ request }) => {
            const response = await deleteEmployee(request, id)
            expect(response.status()).toBe(200)

            const getResponse = await request.get(apiPathWithId(id))
            expect(getResponse.status()).toBe(404)
            expect(await getResponse.json()).toBeEmpty()
        })
    })

    test.describe('Unauthorized actions', () => {
        const unauthorizedTests = [
            { name: 'Get all employees without authorization', method: 'get', path: apiPath },
            { name: 'Add employee without authorization', method: 'post', path: apiPath, data: employee },
            { name: 'Get employee by id without authorization', method: 'get', path: apiPathWithId('some-id') },
            { name: 'Update employee without authorization', method: 'put', path: apiPath, data: { id: 'some-id', firstName: 'newName', lastName: 'newLastName' } },
            { name: 'Delete employee without authorization', method: 'delete', path: apiPathWithId('some-id') },
        ]

        unauthorizedTests.forEach(({ name, method, path, data }) => {
            test(name, async ({ request }) => {
                const response = await request[method](path, { data, headers: { 'Authorization': '' } })
                expect(response.status()).toBe(401)
            })
        })
    })
})