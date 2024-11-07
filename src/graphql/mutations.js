/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const incrementCounter = /* GraphQL */ `
  mutation IncrementCounter($counterName: String!) {
    incrementCounter(counterName: $counterName)
  }
`;
export const updateUserCompany = /* GraphQL */ `
  mutation UpdateUserCompany($userId: ID!, $companySecret: String!) {
    updateUserCompany(userId: $userId, companySecret: $companySecret) {
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
      __typename
    }
  }
`;
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
      __typename
    }
  }
`;
export const createRole = /* GraphQL */ `
  mutation CreateRole(
    $input: CreateRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    createRole(input: $input, condition: $condition) {
      id
      name
      description
      permissions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRole = /* GraphQL */ `
  mutation UpdateRole(
    $input: UpdateRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    updateRole(input: $input, condition: $condition) {
      id
      name
      description
      permissions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRole = /* GraphQL */ `
  mutation DeleteRole(
    $input: DeleteRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    deleteRole(input: $input, condition: $condition) {
      id
      name
      description
      permissions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createUserRole = /* GraphQL */ `
  mutation CreateUserRole(
    $input: CreateUserRoleInput!
    $condition: ModelUserRoleConditionInput
  ) {
    createUserRole(input: $input, condition: $condition) {
      id
      userId
      roleId
      companyId
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
export const updateUserRole = /* GraphQL */ `
  mutation UpdateUserRole(
    $input: UpdateUserRoleInput!
    $condition: ModelUserRoleConditionInput
  ) {
    updateUserRole(input: $input, condition: $condition) {
      id
      userId
      roleId
      companyId
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
export const deleteUserRole = /* GraphQL */ `
  mutation DeleteUserRole(
    $input: DeleteUserRoleInput!
    $condition: ModelUserRoleConditionInput
  ) {
    deleteUserRole(input: $input, condition: $condition) {
      id
      userId
      roleId
      companyId
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
export const createPermission = /* GraphQL */ `
  mutation CreatePermission(
    $input: CreatePermissionInput!
    $condition: ModelPermissionConditionInput
  ) {
    createPermission(input: $input, condition: $condition) {
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
export const updatePermission = /* GraphQL */ `
  mutation UpdatePermission(
    $input: UpdatePermissionInput!
    $condition: ModelPermissionConditionInput
  ) {
    updatePermission(input: $input, condition: $condition) {
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
export const deletePermission = /* GraphQL */ `
  mutation DeletePermission(
    $input: DeletePermissionInput!
    $condition: ModelPermissionConditionInput
  ) {
    deletePermission(input: $input, condition: $condition) {
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
export const createWorkOrder = /* GraphQL */ `
  mutation CreateWorkOrder(
    $input: CreateWorkOrderInput!
    $condition: ModelWorkOrderConditionInput
  ) {
    createWorkOrder(input: $input, condition: $condition) {
      id
      woNumber
      createdById
      assignedToId
      companyId
      CNCId
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
      __typename
    }
  }
`;
export const updateWorkOrder = /* GraphQL */ `
  mutation UpdateWorkOrder(
    $input: UpdateWorkOrderInput!
    $condition: ModelWorkOrderConditionInput
  ) {
    updateWorkOrder(input: $input, condition: $condition) {
      id
      woNumber
      createdById
      assignedToId
      companyId
      CNCId
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
      __typename
    }
  }
`;
export const deleteWorkOrder = /* GraphQL */ `
  mutation DeleteWorkOrder(
    $input: DeleteWorkOrderInput!
    $condition: ModelWorkOrderConditionInput
  ) {
    deleteWorkOrder(input: $input, condition: $condition) {
      id
      woNumber
      createdById
      assignedToId
      companyId
      CNCId
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
      __typename
    }
  }
`;
export const createFile = /* GraphQL */ `
  mutation CreateFile(
    $input: CreateFileInput!
    $condition: ModelFileConditionInput
  ) {
    createFile(input: $input, condition: $condition) {
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
export const updateFile = /* GraphQL */ `
  mutation UpdateFile(
    $input: UpdateFileInput!
    $condition: ModelFileConditionInput
  ) {
    updateFile(input: $input, condition: $condition) {
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
export const deleteFile = /* GraphQL */ `
  mutation DeleteFile(
    $input: DeleteFileInput!
    $condition: ModelFileConditionInput
  ) {
    deleteFile(input: $input, condition: $condition) {
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
export const createAuditLog = /* GraphQL */ `
  mutation CreateAuditLog(
    $input: CreateAuditLogInput!
    $condition: ModelAuditLogConditionInput
  ) {
    createAuditLog(input: $input, condition: $condition) {
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
export const updateAuditLog = /* GraphQL */ `
  mutation UpdateAuditLog(
    $input: UpdateAuditLogInput!
    $condition: ModelAuditLogConditionInput
  ) {
    updateAuditLog(input: $input, condition: $condition) {
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
export const deleteAuditLog = /* GraphQL */ `
  mutation DeleteAuditLog(
    $input: DeleteAuditLogInput!
    $condition: ModelAuditLogConditionInput
  ) {
    deleteAuditLog(input: $input, condition: $condition) {
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
export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
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
        __typename
      }
      __typename
    }
  }
`;
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment(
    $input: UpdatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    updatePayment(input: $input, condition: $condition) {
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
        __typename
      }
      __typename
    }
  }
`;
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment(
    $input: DeletePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    deletePayment(input: $input, condition: $condition) {
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
        __typename
      }
      __typename
    }
  }
`;
export const createMaterial = /* GraphQL */ `
  mutation CreateMaterial(
    $input: CreateMaterialInput!
    $condition: ModelMaterialConditionInput
  ) {
    createMaterial(input: $input, condition: $condition) {
      id
      materialName
      measurements
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMaterial = /* GraphQL */ `
  mutation UpdateMaterial(
    $input: UpdateMaterialInput!
    $condition: ModelMaterialConditionInput
  ) {
    updateMaterial(input: $input, condition: $condition) {
      id
      materialName
      measurements
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMaterial = /* GraphQL */ `
  mutation DeleteMaterial(
    $input: DeleteMaterialInput!
    $condition: ModelMaterialConditionInput
  ) {
    deleteMaterial(input: $input, condition: $condition) {
      id
      materialName
      measurements
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMaterialPricing = /* GraphQL */ `
  mutation CreateMaterialPricing(
    $input: CreateMaterialPricingInput!
    $condition: ModelMaterialPricingConditionInput
  ) {
    createMaterialPricing(input: $input, condition: $condition) {
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
export const updateMaterialPricing = /* GraphQL */ `
  mutation UpdateMaterialPricing(
    $input: UpdateMaterialPricingInput!
    $condition: ModelMaterialPricingConditionInput
  ) {
    updateMaterialPricing(input: $input, condition: $condition) {
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
export const deleteMaterialPricing = /* GraphQL */ `
  mutation DeleteMaterialPricing(
    $input: DeleteMaterialPricingInput!
    $condition: ModelMaterialPricingConditionInput
  ) {
    deleteMaterialPricing(input: $input, condition: $condition) {
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
export const createMiscellaneous = /* GraphQL */ `
  mutation CreateMiscellaneous(
    $input: CreateMiscellaneousInput!
    $condition: ModelMiscellaneousConditionInput
  ) {
    createMiscellaneous(input: $input, condition: $condition) {
      id
      miscName
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMiscellaneous = /* GraphQL */ `
  mutation UpdateMiscellaneous(
    $input: UpdateMiscellaneousInput!
    $condition: ModelMiscellaneousConditionInput
  ) {
    updateMiscellaneous(input: $input, condition: $condition) {
      id
      miscName
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMiscellaneous = /* GraphQL */ `
  mutation DeleteMiscellaneous(
    $input: DeleteMiscellaneousInput!
    $condition: ModelMiscellaneousConditionInput
  ) {
    deleteMiscellaneous(input: $input, condition: $condition) {
      id
      miscName
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createRatchet = /* GraphQL */ `
  mutation CreateRatchet(
    $input: CreateRatchetInput!
    $condition: ModelRatchetConditionInput
  ) {
    createRatchet(input: $input, condition: $condition) {
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
export const updateRatchet = /* GraphQL */ `
  mutation UpdateRatchet(
    $input: UpdateRatchetInput!
    $condition: ModelRatchetConditionInput
  ) {
    updateRatchet(input: $input, condition: $condition) {
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
export const deleteRatchet = /* GraphQL */ `
  mutation DeleteRatchet(
    $input: DeleteRatchetInput!
    $condition: ModelRatchetConditionInput
  ) {
    deleteRatchet(input: $input, condition: $condition) {
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
export const createBuckle = /* GraphQL */ `
  mutation CreateBuckle(
    $input: CreateBuckleInput!
    $condition: ModelBuckleConditionInput
  ) {
    createBuckle(input: $input, condition: $condition) {
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
export const updateBuckle = /* GraphQL */ `
  mutation UpdateBuckle(
    $input: UpdateBuckleInput!
    $condition: ModelBuckleConditionInput
  ) {
    updateBuckle(input: $input, condition: $condition) {
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
export const deleteBuckle = /* GraphQL */ `
  mutation DeleteBuckle(
    $input: DeleteBuckleInput!
    $condition: ModelBuckleConditionInput
  ) {
    deleteBuckle(input: $input, condition: $condition) {
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
export const createDRing = /* GraphQL */ `
  mutation CreateDRing(
    $input: CreateDRingInput!
    $condition: ModelDRingConditionInput
  ) {
    createDRing(input: $input, condition: $condition) {
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
export const updateDRing = /* GraphQL */ `
  mutation UpdateDRing(
    $input: UpdateDRingInput!
    $condition: ModelDRingConditionInput
  ) {
    updateDRing(input: $input, condition: $condition) {
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
export const deleteDRing = /* GraphQL */ `
  mutation DeleteDRing(
    $input: DeleteDRingInput!
    $condition: ModelDRingConditionInput
  ) {
    deleteDRing(input: $input, condition: $condition) {
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
export const createReleaseBuckle = /* GraphQL */ `
  mutation CreateReleaseBuckle(
    $input: CreateReleaseBuckleInput!
    $condition: ModelReleaseBuckleConditionInput
  ) {
    createReleaseBuckle(input: $input, condition: $condition) {
      id
      name
      number
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateReleaseBuckle = /* GraphQL */ `
  mutation UpdateReleaseBuckle(
    $input: UpdateReleaseBuckleInput!
    $condition: ModelReleaseBuckleConditionInput
  ) {
    updateReleaseBuckle(input: $input, condition: $condition) {
      id
      name
      number
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteReleaseBuckle = /* GraphQL */ `
  mutation DeleteReleaseBuckle(
    $input: DeleteReleaseBuckleInput!
    $condition: ModelReleaseBuckleConditionInput
  ) {
    deleteReleaseBuckle(input: $input, condition: $condition) {
      id
      name
      number
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createZipper = /* GraphQL */ `
  mutation CreateZipper(
    $input: CreateZipperInput!
    $condition: ModelZipperConditionInput
  ) {
    createZipper(input: $input, condition: $condition) {
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
export const updateZipper = /* GraphQL */ `
  mutation UpdateZipper(
    $input: UpdateZipperInput!
    $condition: ModelZipperConditionInput
  ) {
    updateZipper(input: $input, condition: $condition) {
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
export const deleteZipper = /* GraphQL */ `
  mutation DeleteZipper(
    $input: DeleteZipperInput!
    $condition: ModelZipperConditionInput
  ) {
    deleteZipper(input: $input, condition: $condition) {
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
export const createZipperChain = /* GraphQL */ `
  mutation CreateZipperChain(
    $input: CreateZipperChainInput!
    $condition: ModelZipperChainConditionInput
  ) {
    createZipperChain(input: $input, condition: $condition) {
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
export const updateZipperChain = /* GraphQL */ `
  mutation UpdateZipperChain(
    $input: UpdateZipperChainInput!
    $condition: ModelZipperChainConditionInput
  ) {
    updateZipperChain(input: $input, condition: $condition) {
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
export const deleteZipperChain = /* GraphQL */ `
  mutation DeleteZipperChain(
    $input: DeleteZipperChainInput!
    $condition: ModelZipperChainConditionInput
  ) {
    deleteZipperChain(input: $input, condition: $condition) {
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
export const createEdge = /* GraphQL */ `
  mutation CreateEdge(
    $input: CreateEdgeInput!
    $condition: ModelEdgeConditionInput
  ) {
    createEdge(input: $input, condition: $condition) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEdge = /* GraphQL */ `
  mutation UpdateEdge(
    $input: UpdateEdgeInput!
    $condition: ModelEdgeConditionInput
  ) {
    updateEdge(input: $input, condition: $condition) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEdge = /* GraphQL */ `
  mutation DeleteEdge(
    $input: DeleteEdgeInput!
    $condition: ModelEdgeConditionInput
  ) {
    deleteEdge(input: $input, condition: $condition) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTotal = /* GraphQL */ `
  mutation CreateTotal(
    $input: CreateTotalInput!
    $condition: ModelTotalConditionInput
  ) {
    createTotal(input: $input, condition: $condition) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTotal = /* GraphQL */ `
  mutation UpdateTotal(
    $input: UpdateTotalInput!
    $condition: ModelTotalConditionInput
  ) {
    updateTotal(input: $input, condition: $condition) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTotal = /* GraphQL */ `
  mutation DeleteTotal(
    $input: DeleteTotalInput!
    $condition: ModelTotalConditionInput
  ) {
    deleteTotal(input: $input, condition: $condition) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createWorkOrderCounter = /* GraphQL */ `
  mutation CreateWorkOrderCounter(
    $input: CreateWorkOrderCounterInput!
    $condition: ModelWorkOrderCounterConditionInput
  ) {
    createWorkOrderCounter(input: $input, condition: $condition) {
      counterName
      currentValue
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateWorkOrderCounter = /* GraphQL */ `
  mutation UpdateWorkOrderCounter(
    $input: UpdateWorkOrderCounterInput!
    $condition: ModelWorkOrderCounterConditionInput
  ) {
    updateWorkOrderCounter(input: $input, condition: $condition) {
      counterName
      currentValue
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteWorkOrderCounter = /* GraphQL */ `
  mutation DeleteWorkOrderCounter(
    $input: DeleteWorkOrderCounterInput!
    $condition: ModelWorkOrderCounterConditionInput
  ) {
    deleteWorkOrderCounter(input: $input, condition: $condition) {
      counterName
      currentValue
      createdAt
      updatedAt
      __typename
    }
  }
`;
