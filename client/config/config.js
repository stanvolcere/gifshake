// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '4uvmsanom5'
export const apiEndpoint = `https://${apiId}.execute-api.eu-west-2.amazonaws.com/dev`
//export const apiEndpoint = 'http://localhost:3001/dev'
export const isOffline = false;


export const authConfig = {
	// TODO: Create an Auth0 application and copy values from it into this map
	domain: 'dev-qt8zh-wb.eu.auth0.com',            // Auth0 domain
	clientId: 'Q9id8k3smotnu9dHKsf7ijiNUTVDhgJV',          // Auth0 client id
	callbackUrl: 'http://localhost:3000/callback'
}
//export const idToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Rldi1xdDh6aC13Yi5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDI5ODUxMzcyNjQ5MjI5Mjk5NjQiLCJhdWQiOiJROWlkOGszc21vdG51OWRIS3NmN2lqaU5VVFZEaGdKViIsImlhdCI6MTYxNzkwNTI2NCwiZXhwIjoxNjE3OTQxMjY0LCJhdF9oYXNoIjoicUxPc3QtalhMZlllUGRtVDNvM3FOUSIsIm5vbmNlIjoiWWNQdjdkSVBSVmVQeWM4YkZ2QUxlVUlCdU1yWkdDQ0EifQ.5bsQ3e6xi-oiPX5mxgfldgyxBeJA1CeiebOt2X8MROI'
//export const idToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Rldi1xdDh6aC13Yi5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDQyNDcxMjYzNTk3MjMyOTQyNDEiLCJhdWQiOiJROWlkOGszc21vdG51OWRIS3NmN2lqaU5VVFZEaGdKViIsImlhdCI6MTYxODAwMDEyOCwiZXhwIjoxNjE4MDM2MTI4LCJhdF9oYXNoIjoiektzT1R2cnpUX3NRVENTd1E4Qy1xQSIsIm5vbmNlIjoiS1hoTHRwemp2WS1PLX5fWmNLS3pYbHk4eS5VeVItelkifQ.5nZgnuiAJzAMOsRA0krgK_MwDojkEn0ccwcPHDBxFXM'