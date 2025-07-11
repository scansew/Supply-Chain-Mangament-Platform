/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserByUsername = /* GraphQL */ `
  query GetUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      username
      email
      family_name
      given_name
      createdAt
      updatedAt
      role
      workOrdersCreated {
        nextToken
        __typename
      }
      workOrdersAssigned {
        nextToken
        __typename
      }
      filesUploaded {
        nextToken
        __typename
      }
      auditLogs {
        nextToken
        __typename
      }
      companyId
      companyName
      stageUpdates {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      address
      companySecret
      stripeConnectId
      createdAt
      updatedAt
      users {
        nextToken
        __typename
      }
      workOrders {
        nextToken
        __typename
      }
      CNCWorkOrders {
        nextToken
        __typename
      }
      ManWorkOrders {
        nextToken
        __typename
      }
      materialPricings {
        nextToken
        __typename
      }
      companyRoles {
        nextToken
        __typename
      }
      workflowStages {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const listCompanies = /* GraphQL */ `
  query ListCompanies(
    $id: ID
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCompanies(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        address
        companySecret
        stripeConnectId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCompanyRole = /* GraphQL */ `
  query GetCompanyRole($id: ID!) {
    getCompanyRole(id: $id) {
      id
      roleId
      companyId
      shippingAddress
      private
      isActive
      createdAt
      updatedAt
      company {
        id
        name
        address
        companySecret
        stripeConnectId
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const listCompanyRoles = /* GraphQL */ `
  query ListCompanyRoles(
    $id: ID
    $filter: ModelCompanyRoleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCompanyRoles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        roleId
        companyId
        shippingAddress
        private
        isActive
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      family_name
      given_name
      createdAt
      updatedAt
      role
      workOrdersCreated {
        nextToken
        __typename
      }
      workOrdersAssigned {
        nextToken
        __typename
      }
      filesUploaded {
        nextToken
        __typename
      }
      auditLogs {
        nextToken
        __typename
      }
      companyId
      companyName
      stageUpdates {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        username
        email
        family_name
        given_name
        createdAt
        updatedAt
        role
        companyId
        companyName
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWorkOrder = /* GraphQL */ `
  query GetWorkOrder($id: ID!) {
    getWorkOrder(id: $id) {
      id
      woNumber
      createdById
      assignedToId
      companyId
      CNCId
      manId
      status
      filesFolder
      type
      details
      materialSelection
      estimatedPrice
      msrp
      createdAt
      updatedAt
      process
      make
      model
      year
      crmClientId
      rawImages
      rawDesignImages
      description
      materialPrice
      manufacturePrice
      raw3dModel
      designPhotos
      outline3dModel
      approved3dModel
      main2dPattern
      billOfMaterials
      cnc2dPattern
      scanInfo
      businessName
      attnName
      businessPhone
      businessShippingAddress
      customerName
      customerDropShippingAddress
      shippingTrackingInfo
      createdBy {
        id
        username
        email
        family_name
        given_name
        createdAt
        updatedAt
        role
        companyId
        companyName
        __typename
      }
      assignedTo {
        id
        username
        email
        family_name
        given_name
        createdAt
        updatedAt
        role
        companyId
        companyName
        __typename
      }
      company {
        id
        name
        address
        companySecret
        stripeConnectId
        createdAt
        updatedAt
        __typename
      }
      CNCCompany {
        id
        name
        address
        companySecret
        stripeConnectId
        createdAt
        updatedAt
        __typename
      }
      ManCompany {
        id
        name
        address
        companySecret
        stripeConnectId
        createdAt
        updatedAt
        __typename
      }
      crmClient {
        id
        username
        email
        family_name
        given_name
        createdAt
        updatedAt
        role
        companyId
        companyName
        __typename
      }
      files {
        nextToken
        __typename
      }
      payments {
        nextToken
        __typename
      }
      currentStage
      currentStageId
      estimatedCompletionDate
      workflowStages {
        nextToken
        __typename
      }
      stageUpdates {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const listWorkOrders = /* GraphQL */ `
  query ListWorkOrders(
    $id: ID
    $filter: ModelWorkOrderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listWorkOrders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        woNumber
        createdById
        assignedToId
        companyId
        CNCId
        manId
        status
        filesFolder
        type
        details
        materialSelection
        estimatedPrice
        msrp
        createdAt
        updatedAt
        process
        make
        model
        year
        crmClientId
        rawImages
        rawDesignImages
        description
        materialPrice
        manufacturePrice
        raw3dModel
        designPhotos
        outline3dModel
        approved3dModel
        main2dPattern
        billOfMaterials
        cnc2dPattern
        scanInfo
        businessName
        attnName
        businessPhone
        businessShippingAddress
        customerName
        customerDropShippingAddress
        shippingTrackingInfo
        currentStage
        currentStageId
        estimatedCompletionDate
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWorkflowStage = /* GraphQL */ `
  query GetWorkflowStage($id: ID!) {
    getWorkflowStage(id: $id) {
      id
      workOrderId
      stage
      status
      companyId
      startDate
      completionDate
      estimatedCompletionDate
      notes
      attn
      qualityCheck
      createdAt
      updatedAt
      priority
      estimatedDuration
      workOrder {
        id
        woNumber
        createdById
        assignedToId
        companyId
        CNCId
        manId
        status
        filesFolder
        type
        details
        materialSelection
        estimatedPrice
        msrp
        createdAt
        updatedAt
        process
        make
        model
        year
        crmClientId
        rawImages
        rawDesignImages
        description
        materialPrice
        manufacturePrice
        raw3dModel
        designPhotos
        outline3dModel
        approved3dModel
        main2dPattern
        billOfMaterials
        cnc2dPattern
        scanInfo
        businessName
        attnName
        businessPhone
        businessShippingAddress
        customerName
        customerDropShippingAddress
        shippingTrackingInfo
        currentStage
        currentStageId
        estimatedCompletionDate
        __typename
      }
      company {
        id
        name
        address
        companySecret
        stripeConnectId
        createdAt
        updatedAt
        __typename
      }
      stageUpdates {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const listWorkflowStages = /* GraphQL */ `
  query ListWorkflowStages(
    $id: ID
    $filter: ModelWorkflowStageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listWorkflowStages(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        workOrderId
        stage
        status
        companyId
        startDate
        completionDate
        estimatedCompletionDate
        notes
        attn
        qualityCheck
        createdAt
        updatedAt
        priority
        estimatedDuration
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStageUpdate = /* GraphQL */ `
  query GetStageUpdate($id: ID!) {
    getStageUpdate(id: $id) {
      id
      workflowStageId
      status
      notes
      timestamp
      updatedById
      updatedBy {
        id
        username
        email
        family_name
        given_name
        createdAt
        updatedAt
        role
        companyId
        companyName
        __typename
      }
      workflowStage {
        id
        workOrderId
        stage
        status
        companyId
        startDate
        completionDate
        estimatedCompletionDate
        notes
        attn
        qualityCheck
        createdAt
        updatedAt
        priority
        estimatedDuration
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listStageUpdates = /* GraphQL */ `
  query ListStageUpdates(
    $id: ID
    $filter: ModelStageUpdateFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStageUpdates(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        workflowStageId
        status
        notes
        timestamp
        updatedById
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
      id
      workOrderId
      fileType
      url
      uploadedById
      createdAt
      updatedAt
      workOrder {
        id
        woNumber
        createdById
        assignedToId
        companyId
        CNCId
        manId
        status
        filesFolder
        type
        details
        materialSelection
        estimatedPrice
        msrp
        createdAt
        updatedAt
        process
        make
        model
        year
        crmClientId
        rawImages
        rawDesignImages
        description
        materialPrice
        manufacturePrice
        raw3dModel
        designPhotos
        outline3dModel
        approved3dModel
        main2dPattern
        billOfMaterials
        cnc2dPattern
        scanInfo
        businessName
        attnName
        businessPhone
        businessShippingAddress
        customerName
        customerDropShippingAddress
        shippingTrackingInfo
        currentStage
        currentStageId
        estimatedCompletionDate
        __typename
      }
      uploadedBy {
        id
        username
        email
        family_name
        given_name
        createdAt
        updatedAt
        role
        companyId
        companyName
        __typename
      }
      __typename
    }
  }
`;
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $id: ID
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFiles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        workOrderId
        fileType
        url
        uploadedById
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAuditLog = /* GraphQL */ `
  query GetAuditLog($id: ID!) {
    getAuditLog(id: $id) {
      id
      userId
      action
      details
      createdAt
      user {
        id
        username
        email
        family_name
        given_name
        createdAt
        updatedAt
        role
        companyId
        companyName
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const listAuditLogs = /* GraphQL */ `
  query ListAuditLogs(
    $id: ID
    $filter: ModelAuditLogFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAuditLogs(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userId
        action
        details
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPayment = /* GraphQL */ `
  query GetPayment($id: ID!) {
    getPayment(id: $id) {
      id
      workOrderId
      amount
      stripePaymentId
      status
      createdAt
      updatedAt
      workOrder {
        id
        woNumber
        createdById
        assignedToId
        companyId
        CNCId
        manId
        status
        filesFolder
        type
        details
        materialSelection
        estimatedPrice
        msrp
        createdAt
        updatedAt
        process
        make
        model
        year
        crmClientId
        rawImages
        rawDesignImages
        description
        materialPrice
        manufacturePrice
        raw3dModel
        designPhotos
        outline3dModel
        approved3dModel
        main2dPattern
        billOfMaterials
        cnc2dPattern
        scanInfo
        businessName
        attnName
        businessPhone
        businessShippingAddress
        customerName
        customerDropShippingAddress
        shippingTrackingInfo
        currentStage
        currentStageId
        estimatedCompletionDate
        __typename
      }
      __typename
    }
  }
`;
export const listPayments = /* GraphQL */ `
  query ListPayments(
    $id: ID
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPayments(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        workOrderId
        amount
        stripePaymentId
        status
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMaterial = /* GraphQL */ `
  query GetMaterial($id: ID!) {
    getMaterial(id: $id) {
      id
      materialName
      measurements
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMaterials = /* GraphQL */ `
  query ListMaterials(
    $id: ID
    $filter: ModelMaterialFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMaterials(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        materialName
        measurements
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMaterialPricing = /* GraphQL */ `
  query GetMaterialPricing($id: ID!) {
    getMaterialPricing(id: $id) {
      id
      companyId
      materialName
      pricePerYard
      createdAt
      updatedAt
      company {
        id
        name
        address
        companySecret
        stripeConnectId
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const listMaterialPricings = /* GraphQL */ `
  query ListMaterialPricings(
    $id: ID
    $filter: ModelMaterialPricingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMaterialPricings(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        companyId
        materialName
        pricePerYard
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMiscellaneous = /* GraphQL */ `
  query GetMiscellaneous($id: ID!) {
    getMiscellaneous(id: $id) {
      id
      miscName
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMiscellaneous = /* GraphQL */ `
  query ListMiscellaneous(
    $id: ID
    $filter: ModelMiscellaneousFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMiscellaneous(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        miscName
        quantity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRatchet = /* GraphQL */ `
  query GetRatchet($id: ID!) {
    getRatchet(id: $id) {
      id
      name
      number
      webbing
      binding
      otherA
      otherB
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRatchets = /* GraphQL */ `
  query ListRatchets(
    $id: ID
    $filter: ModelRatchetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRatchets(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        number
        webbing
        binding
        otherA
        otherB
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBuckle = /* GraphQL */ `
  query GetBuckle($id: ID!) {
    getBuckle(id: $id) {
      id
      name
      number
      webbing
      binding
      otherA
      otherB
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBuckles = /* GraphQL */ `
  query ListBuckles(
    $id: ID
    $filter: ModelBuckleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBuckles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        number
        webbing
        binding
        otherA
        otherB
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDRing = /* GraphQL */ `
  query GetDRing($id: ID!) {
    getDRing(id: $id) {
      id
      dRingTotal
      name
      number
      webbing
      strap
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDRings = /* GraphQL */ `
  query ListDRings(
    $id: ID
    $filter: ModelDRingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDRings(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        dRingTotal
        name
        number
        webbing
        strap
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReleaseBuckle = /* GraphQL */ `
  query GetReleaseBuckle($id: ID!) {
    getReleaseBuckle(id: $id) {
      id
      name
      number
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listReleaseBuckles = /* GraphQL */ `
  query ListReleaseBuckles(
    $id: ID
    $filter: ModelReleaseBuckleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listReleaseBuckles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        number
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getZipper = /* GraphQL */ `
  query GetZipper($id: ID!) {
    getZipper(id: $id) {
      id
      name
      size
      number
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listZippers = /* GraphQL */ `
  query ListZippers(
    $id: ID
    $filter: ModelZipperFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listZippers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        size
        number
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getZipperChain = /* GraphQL */ `
  query GetZipperChain($id: ID!) {
    getZipperChain(id: $id) {
      id
      name
      quantity
      measurements
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listZipperChains = /* GraphQL */ `
  query ListZipperChains(
    $id: ID
    $filter: ModelZipperChainFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listZipperChains(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        quantity
        measurements
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEdge = /* GraphQL */ `
  query GetEdge($id: ID!) {
    getEdge(id: $id) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEdges = /* GraphQL */ `
  query ListEdges(
    $id: ID
    $filter: ModelEdgeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEdges(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        quantity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTotal = /* GraphQL */ `
  query GetTotal($id: ID!) {
    getTotal(id: $id) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTotals = /* GraphQL */ `
  query ListTotals(
    $id: ID
    $filter: ModelTotalFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTotals(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        quantity
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPermission = /* GraphQL */ `
  query GetPermission($id: ID!) {
    getPermission(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPermissions = /* GraphQL */ `
  query ListPermissions(
    $id: ID
    $filter: ModelPermissionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPermissions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRole = /* GraphQL */ `
  query GetRole($id: ID!) {
    getRole(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRoles = /* GraphQL */ `
  query ListRoles(
    $id: ID
    $filter: ModelRoleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRoles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserRole = /* GraphQL */ `
  query GetUserRole($id: ID!) {
    getUserRole(id: $id) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserRoles = /* GraphQL */ `
  query ListUserRoles(
    $id: ID
    $filter: ModelUserRoleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserRoles(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWorkOrderCounter = /* GraphQL */ `
  query GetWorkOrderCounter($counterName: String!) {
    getWorkOrderCounter(counterName: $counterName) {
      counterName
      currentValue
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listWorkOrderCounters = /* GraphQL */ `
  query ListWorkOrderCounters(
    $counterName: String
    $filter: ModelWorkOrderCounterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listWorkOrderCounters(
      counterName: $counterName
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        counterName
        currentValue
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const companiesByCompanySecret = /* GraphQL */ `
  query CompaniesByCompanySecret(
    $companySecret: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    companiesByCompanySecret(
      companySecret: $companySecret
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        address
        companySecret
        stripeConnectId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const companyRolesByCompanyId = /* GraphQL */ `
  query CompanyRolesByCompanyId(
    $companyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCompanyRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    companyRolesByCompanyId(
      companyId: $companyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        roleId
        companyId
        shippingAddress
        private
        isActive
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const usersByUsernameAndId = /* GraphQL */ `
  query UsersByUsernameAndId(
    $username: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByUsernameAndId(
      username: $username
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        email
        family_name
        given_name
        createdAt
        updatedAt
        role
        companyId
        companyName
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const usersByEmailAndId = /* GraphQL */ `
  query UsersByEmailAndId(
    $email: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByEmailAndId(
      email: $email
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        email
        family_name
        given_name
        createdAt
        updatedAt
        role
        companyId
        companyName
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const usersByCompanyId = /* GraphQL */ `
  query UsersByCompanyId(
    $companyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByCompanyId(
      companyId: $companyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        email
        family_name
        given_name
        createdAt
        updatedAt
        role
        companyId
        companyName
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const workOrdersByCreatedById = /* GraphQL */ `
  query WorkOrdersByCreatedById(
    $createdById: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workOrdersByCreatedById(
      createdById: $createdById
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        woNumber
        createdById
        assignedToId
        companyId
        CNCId
        manId
        status
        filesFolder
        type
        details
        materialSelection
        estimatedPrice
        msrp
        createdAt
        updatedAt
        process
        make
        model
        year
        crmClientId
        rawImages
        rawDesignImages
        description
        materialPrice
        manufacturePrice
        raw3dModel
        designPhotos
        outline3dModel
        approved3dModel
        main2dPattern
        billOfMaterials
        cnc2dPattern
        scanInfo
        businessName
        attnName
        businessPhone
        businessShippingAddress
        customerName
        customerDropShippingAddress
        shippingTrackingInfo
        currentStage
        currentStageId
        estimatedCompletionDate
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const workOrdersByAssignedToId = /* GraphQL */ `
  query WorkOrdersByAssignedToId(
    $assignedToId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workOrdersByAssignedToId(
      assignedToId: $assignedToId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        woNumber
        createdById
        assignedToId
        companyId
        CNCId
        manId
        status
        filesFolder
        type
        details
        materialSelection
        estimatedPrice
        msrp
        createdAt
        updatedAt
        process
        make
        model
        year
        crmClientId
        rawImages
        rawDesignImages
        description
        materialPrice
        manufacturePrice
        raw3dModel
        designPhotos
        outline3dModel
        approved3dModel
        main2dPattern
        billOfMaterials
        cnc2dPattern
        scanInfo
        businessName
        attnName
        businessPhone
        businessShippingAddress
        customerName
        customerDropShippingAddress
        shippingTrackingInfo
        currentStage
        currentStageId
        estimatedCompletionDate
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const workOrdersByCompanyId = /* GraphQL */ `
  query WorkOrdersByCompanyId(
    $companyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workOrdersByCompanyId(
      companyId: $companyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        woNumber
        createdById
        assignedToId
        companyId
        CNCId
        manId
        status
        filesFolder
        type
        details
        materialSelection
        estimatedPrice
        msrp
        createdAt
        updatedAt
        process
        make
        model
        year
        crmClientId
        rawImages
        rawDesignImages
        description
        materialPrice
        manufacturePrice
        raw3dModel
        designPhotos
        outline3dModel
        approved3dModel
        main2dPattern
        billOfMaterials
        cnc2dPattern
        scanInfo
        businessName
        attnName
        businessPhone
        businessShippingAddress
        customerName
        customerDropShippingAddress
        shippingTrackingInfo
        currentStage
        currentStageId
        estimatedCompletionDate
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const workOrdersByCNCId = /* GraphQL */ `
  query WorkOrdersByCNCId(
    $CNCId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workOrdersByCNCId(
      CNCId: $CNCId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        woNumber
        createdById
        assignedToId
        companyId
        CNCId
        manId
        status
        filesFolder
        type
        details
        materialSelection
        estimatedPrice
        msrp
        createdAt
        updatedAt
        process
        make
        model
        year
        crmClientId
        rawImages
        rawDesignImages
        description
        materialPrice
        manufacturePrice
        raw3dModel
        designPhotos
        outline3dModel
        approved3dModel
        main2dPattern
        billOfMaterials
        cnc2dPattern
        scanInfo
        businessName
        attnName
        businessPhone
        businessShippingAddress
        customerName
        customerDropShippingAddress
        shippingTrackingInfo
        currentStage
        currentStageId
        estimatedCompletionDate
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const workOrdersByManId = /* GraphQL */ `
  query WorkOrdersByManId(
    $manId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workOrdersByManId(
      manId: $manId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        woNumber
        createdById
        assignedToId
        companyId
        CNCId
        manId
        status
        filesFolder
        type
        details
        materialSelection
        estimatedPrice
        msrp
        createdAt
        updatedAt
        process
        make
        model
        year
        crmClientId
        rawImages
        rawDesignImages
        description
        materialPrice
        manufacturePrice
        raw3dModel
        designPhotos
        outline3dModel
        approved3dModel
        main2dPattern
        billOfMaterials
        cnc2dPattern
        scanInfo
        businessName
        attnName
        businessPhone
        businessShippingAddress
        customerName
        customerDropShippingAddress
        shippingTrackingInfo
        currentStage
        currentStageId
        estimatedCompletionDate
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const workflowStagesByWorkOrderId = /* GraphQL */ `
  query WorkflowStagesByWorkOrderId(
    $workOrderId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkflowStageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workflowStagesByWorkOrderId(
      workOrderId: $workOrderId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workOrderId
        stage
        status
        companyId
        startDate
        completionDate
        estimatedCompletionDate
        notes
        attn
        qualityCheck
        createdAt
        updatedAt
        priority
        estimatedDuration
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const workflowStagesByCompanyId = /* GraphQL */ `
  query WorkflowStagesByCompanyId(
    $companyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkflowStageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workflowStagesByCompanyId(
      companyId: $companyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workOrderId
        stage
        status
        companyId
        startDate
        completionDate
        estimatedCompletionDate
        notes
        attn
        qualityCheck
        createdAt
        updatedAt
        priority
        estimatedDuration
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const stageUpdatesByWorkflowStageId = /* GraphQL */ `
  query StageUpdatesByWorkflowStageId(
    $workflowStageId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStageUpdateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    stageUpdatesByWorkflowStageId(
      workflowStageId: $workflowStageId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workflowStageId
        status
        notes
        timestamp
        updatedById
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const stageUpdatesByUpdatedById = /* GraphQL */ `
  query StageUpdatesByUpdatedById(
    $updatedById: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStageUpdateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    stageUpdatesByUpdatedById(
      updatedById: $updatedById
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workflowStageId
        status
        notes
        timestamp
        updatedById
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const filesByWorkOrderId = /* GraphQL */ `
  query FilesByWorkOrderId(
    $workOrderId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    filesByWorkOrderId(
      workOrderId: $workOrderId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workOrderId
        fileType
        url
        uploadedById
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const filesByUploadedById = /* GraphQL */ `
  query FilesByUploadedById(
    $uploadedById: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    filesByUploadedById(
      uploadedById: $uploadedById
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workOrderId
        fileType
        url
        uploadedById
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const auditLogsByUserId = /* GraphQL */ `
  query AuditLogsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAuditLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    auditLogsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        action
        details
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const paymentsByWorkOrderId = /* GraphQL */ `
  query PaymentsByWorkOrderId(
    $workOrderId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentsByWorkOrderId(
      workOrderId: $workOrderId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workOrderId
        amount
        stripePaymentId
        status
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const materialPricingsByCompanyId = /* GraphQL */ `
  query MaterialPricingsByCompanyId(
    $companyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMaterialPricingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    materialPricingsByCompanyId(
      companyId: $companyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        companyId
        materialName
        pricePerYard
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
