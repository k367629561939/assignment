import { APIRequestContext } from "@playwright/test"
import { apiPath, apiPathWithId } from "../helpers/constants"
import { getEnvVar } from "../helpers/envVars"

export async function addEmployee(request: APIRequestContext, employee: {
    firstName?: string,
    lastName?: string,
    dependants?: number
}) {
    return await request.post(apiPath, { data: employee, headers: { Authorization: getEnvVar("AUTHORIZATION_TOKEN") } })
}

export async function deleteEmployee(request: APIRequestContext, id: string) {
    return await request.delete(apiPathWithId(id), {headers: { Authorization: getEnvVar("AUTHORIZATION_TOKEN") }})
}