# Scan and Sew app

- npm install
- amplify configure
- amplify pull
- npm run dev

- npm install
- npm run dev

### edit work order while changing environment of amplify

### Add work order counter item to table

### Add work order counter resolver

### DB private

### Request byUsername

{
"version": "2018-05-29",
"operation": "Query",
"index": "byUsername",
"query": {
"expression": "#username = :username",
"expressionNames": {
"#username": "username"
},
"expressionValues": {
":username": $util.dynamodb.toDynamoDBJson($ctx.args.username)
}
}
}

### response

#if($ctx.error)
    $util.error($ctx.error.message, $ctx.error.type)
#end

#if($ctx.result.items.size() == 0)
    null
#else
    $util.toJson($ctx.result.items[0])
#end

#### Request

{
"version" : "2018-05-29",
"operation" : "UpdateItem",
"key" : {
"counterName" : $util.dynamodb.toDynamoDBJson($ctx.args.counterName)
},
"update" : {
"expression" : "SET currentValue = currentValue + :incr",
"expressionValues" : {
":incr" : { "N" : 1 }
}
}
}

#### response

    #if($ctx.error)
        $util.error($ctx.error.message, $ctx.error.type)
    #end
    ## Pass back the result from DynamoDB. **
    $util.toJson($ctx.result.currentValue)

### Enable Transfer acceleration S3

### Update new user profile

## Mutation.updateUserCompany.req.vtl (Pipeline Request Mapping Template)

{
"version": "2018-05-29",
"payload": $util.toJson($ctx.args)
}

## Mutation.updateUserCompany.res.vtl (Pipeline Response Mapping Template)

$util.toJson($ctx.prev.result)

## Function.getCompanyBySecret.req.vtl (First Function Request Mapping Template)

{
"version": "2018-05-29",
"operation": "Query",
"index": "byCompanySecret",
"query": {
"expression": "companySecret = :companySecret",
"expressionValues": {
":companySecret": $util.dynamodb.toDynamoDBJson($ctx.args.companySecret)
}
},
"scanIndexForward": true,
"limit": 1
}

## Function.getCompanyBySecret.res.vtl (First Function Response Mapping Template)

#if(!$ctx.result.items || $ctx.result.items.size() == 0)
$util.error("Company not found with provided secret")
#end
$util.qr($ctx.stash.put("companyId", $ctx.result.items[0].id))
$util.qr($ctx.stash.put("companyName", $ctx.result.items[0].name))
$util.toJson($ctx.result.items[0])

## Function.updateUserProfile.req.vtl (Second Function Request Mapping Template)

{
"version": "2018-05-29",
"operation": "UpdateItem",
"key": {
"id": $util.dynamodb.toDynamoDBJson($ctx.args.userId)
},
"update": {
"expression": "SET companyId = :companyId, companyName = :companyName, #roleAttr = :role",
"expressionNames": {
"#roleAttr": "role"
},
"expressionValues": {
":companyId": $util.dynamodb.toDynamoDBJson($ctx.stash.companyId),
":companyName": $util.dynamodb.toDynamoDBJson($ctx.stash.companyName),
":role": $util.dynamodb.toDynamoDBJson("emp")
}
},
"condition": {
"expression": "attribute_exists(id)"
}
}

## Function.updateUserProfile.res.vtl (Second Function Response Mapping Template)

#if($ctx.error)
    $util.error($ctx.error.message, $ctx.error.type)
#end
$util.toJson($ctx.result)
