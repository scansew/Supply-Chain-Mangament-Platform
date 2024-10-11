/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      address
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
      materialPricings {
        nextToken
        __typename
      }
      userRoles {
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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      passwordHash
      createdAt
      updatedAt
      roles {
        nextToken
        __typename
      }
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
        passwordHash
        createdAt
        updatedAt
        companyId
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
      permissions {
        nextToken
        __typename
      }
      userRoles {
        nextToken
        __typename
      }
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
      userId
      roleId
      companyId
      createdAt
      updatedAt
      user {
        id
        username
        email
        passwordHash
        createdAt
        updatedAt
        companyId
        __typename
      }
      role {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      company {
        id
        name
        address
        stripeConnectId
        createdAt
        updatedAt
        __typename
      }
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
        userId
        roleId
        companyId
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
      roleId
      action
      description
      role {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
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
        roleId
        action
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
export const getWorkOrder = /* GraphQL */ `
  query GetWorkOrder($id: ID!) {
    getWorkOrder(id: $id) {
      id
      woNumber
      createdById
      assignedToId
      companyId
      status
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
        passwordHash
        createdAt
        updatedAt
        companyId
        __typename
      }
      assignedTo {
        id
        username
        email
        passwordHash
        createdAt
        updatedAt
        companyId
        __typename
      }
      company {
        id
        name
        address
        stripeConnectId
        createdAt
        updatedAt
        __typename
      }
      crmClient {
        id
        username
        email
        passwordHash
        createdAt
        updatedAt
        companyId
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
        status
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
        status
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
        __typename
      }
      uploadedBy {
        id
        username
        email
        passwordHash
        createdAt
        updatedAt
        companyId
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
        passwordHash
        createdAt
        updatedAt
        companyId
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
        status
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
export const getWorkOrderCounter = /* GraphQL */ `
  query GetWorkOrderCounter($id: ID!) {
    getWorkOrderCounter(id: $id) {
      id
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
    $id: ID
    $filter: ModelWorkOrderCounterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listWorkOrderCounters(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
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
        passwordHash
        createdAt
        updatedAt
        companyId
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
        passwordHash
        createdAt
        updatedAt
        companyId
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
        passwordHash
        createdAt
        updatedAt
        companyId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userRolesByUserId = /* GraphQL */ `
  query UserRolesByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userRolesByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        roleId
        companyId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userRolesByRoleId = /* GraphQL */ `
  query UserRolesByRoleId(
    $roleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userRolesByRoleId(
      roleId: $roleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        roleId
        companyId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const userRolesByCompanyId = /* GraphQL */ `
  query UserRolesByCompanyId(
    $companyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userRolesByCompanyId(
      companyId: $companyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        roleId
        companyId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const permissionsByRoleId = /* GraphQL */ `
  query PermissionsByRoleId(
    $roleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPermissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    permissionsByRoleId(
      roleId: $roleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        roleId
        action
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
        status
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
        status
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
        status
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
export const workOrderCountersByCounterName = /* GraphQL */ `
  query WorkOrderCountersByCounterName(
    $counterName: String!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkOrderCounterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workOrderCountersByCounterName(
      counterName: $counterName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
