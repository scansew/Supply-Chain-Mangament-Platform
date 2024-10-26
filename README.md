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

##Update username resolver on appsync 

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
