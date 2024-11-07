/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onCreateCompany(filter: $filter) {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onUpdateCompany(filter: $filter) {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onDeleteCompany(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateRole = /* GraphQL */ `
  subscription OnCreateRole($filter: ModelSubscriptionRoleFilterInput) {
    onCreateRole(filter: $filter) {
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
export const onUpdateRole = /* GraphQL */ `
  subscription OnUpdateRole($filter: ModelSubscriptionRoleFilterInput) {
    onUpdateRole(filter: $filter) {
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
export const onDeleteRole = /* GraphQL */ `
  subscription OnDeleteRole($filter: ModelSubscriptionRoleFilterInput) {
    onDeleteRole(filter: $filter) {
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
export const onCreateUserRole = /* GraphQL */ `
  subscription OnCreateUserRole($filter: ModelSubscriptionUserRoleFilterInput) {
    onCreateUserRole(filter: $filter) {
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
export const onUpdateUserRole = /* GraphQL */ `
  subscription OnUpdateUserRole($filter: ModelSubscriptionUserRoleFilterInput) {
    onUpdateUserRole(filter: $filter) {
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
export const onDeleteUserRole = /* GraphQL */ `
  subscription OnDeleteUserRole($filter: ModelSubscriptionUserRoleFilterInput) {
    onDeleteUserRole(filter: $filter) {
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
export const onCreatePermission = /* GraphQL */ `
  subscription OnCreatePermission(
    $filter: ModelSubscriptionPermissionFilterInput
  ) {
    onCreatePermission(filter: $filter) {
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
export const onUpdatePermission = /* GraphQL */ `
  subscription OnUpdatePermission(
    $filter: ModelSubscriptionPermissionFilterInput
  ) {
    onUpdatePermission(filter: $filter) {
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
export const onDeletePermission = /* GraphQL */ `
  subscription OnDeletePermission(
    $filter: ModelSubscriptionPermissionFilterInput
  ) {
    onDeletePermission(filter: $filter) {
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
export const onCreateWorkOrder = /* GraphQL */ `
  subscription OnCreateWorkOrder(
    $filter: ModelSubscriptionWorkOrderFilterInput
  ) {
    onCreateWorkOrder(filter: $filter) {
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
export const onUpdateWorkOrder = /* GraphQL */ `
  subscription OnUpdateWorkOrder(
    $filter: ModelSubscriptionWorkOrderFilterInput
  ) {
    onUpdateWorkOrder(filter: $filter) {
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
export const onDeleteWorkOrder = /* GraphQL */ `
  subscription OnDeleteWorkOrder(
    $filter: ModelSubscriptionWorkOrderFilterInput
  ) {
    onDeleteWorkOrder(filter: $filter) {
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
export const onCreateFile = /* GraphQL */ `
  subscription OnCreateFile($filter: ModelSubscriptionFileFilterInput) {
    onCreateFile(filter: $filter) {
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
export const onUpdateFile = /* GraphQL */ `
  subscription OnUpdateFile($filter: ModelSubscriptionFileFilterInput) {
    onUpdateFile(filter: $filter) {
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
export const onDeleteFile = /* GraphQL */ `
  subscription OnDeleteFile($filter: ModelSubscriptionFileFilterInput) {
    onDeleteFile(filter: $filter) {
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
export const onCreateAuditLog = /* GraphQL */ `
  subscription OnCreateAuditLog($filter: ModelSubscriptionAuditLogFilterInput) {
    onCreateAuditLog(filter: $filter) {
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
export const onUpdateAuditLog = /* GraphQL */ `
  subscription OnUpdateAuditLog($filter: ModelSubscriptionAuditLogFilterInput) {
    onUpdateAuditLog(filter: $filter) {
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
export const onDeleteAuditLog = /* GraphQL */ `
  subscription OnDeleteAuditLog($filter: ModelSubscriptionAuditLogFilterInput) {
    onDeleteAuditLog(filter: $filter) {
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
export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onCreatePayment(filter: $filter) {
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
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onUpdatePayment(filter: $filter) {
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
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment($filter: ModelSubscriptionPaymentFilterInput) {
    onDeletePayment(filter: $filter) {
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
export const onCreateMaterial = /* GraphQL */ `
  subscription OnCreateMaterial($filter: ModelSubscriptionMaterialFilterInput) {
    onCreateMaterial(filter: $filter) {
      id
      materialName
      measurements
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMaterial = /* GraphQL */ `
  subscription OnUpdateMaterial($filter: ModelSubscriptionMaterialFilterInput) {
    onUpdateMaterial(filter: $filter) {
      id
      materialName
      measurements
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMaterial = /* GraphQL */ `
  subscription OnDeleteMaterial($filter: ModelSubscriptionMaterialFilterInput) {
    onDeleteMaterial(filter: $filter) {
      id
      materialName
      measurements
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMaterialPricing = /* GraphQL */ `
  subscription OnCreateMaterialPricing(
    $filter: ModelSubscriptionMaterialPricingFilterInput
  ) {
    onCreateMaterialPricing(filter: $filter) {
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
export const onUpdateMaterialPricing = /* GraphQL */ `
  subscription OnUpdateMaterialPricing(
    $filter: ModelSubscriptionMaterialPricingFilterInput
  ) {
    onUpdateMaterialPricing(filter: $filter) {
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
export const onDeleteMaterialPricing = /* GraphQL */ `
  subscription OnDeleteMaterialPricing(
    $filter: ModelSubscriptionMaterialPricingFilterInput
  ) {
    onDeleteMaterialPricing(filter: $filter) {
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
export const onCreateMiscellaneous = /* GraphQL */ `
  subscription OnCreateMiscellaneous(
    $filter: ModelSubscriptionMiscellaneousFilterInput
  ) {
    onCreateMiscellaneous(filter: $filter) {
      id
      miscName
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMiscellaneous = /* GraphQL */ `
  subscription OnUpdateMiscellaneous(
    $filter: ModelSubscriptionMiscellaneousFilterInput
  ) {
    onUpdateMiscellaneous(filter: $filter) {
      id
      miscName
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMiscellaneous = /* GraphQL */ `
  subscription OnDeleteMiscellaneous(
    $filter: ModelSubscriptionMiscellaneousFilterInput
  ) {
    onDeleteMiscellaneous(filter: $filter) {
      id
      miscName
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateRatchet = /* GraphQL */ `
  subscription OnCreateRatchet($filter: ModelSubscriptionRatchetFilterInput) {
    onCreateRatchet(filter: $filter) {
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
export const onUpdateRatchet = /* GraphQL */ `
  subscription OnUpdateRatchet($filter: ModelSubscriptionRatchetFilterInput) {
    onUpdateRatchet(filter: $filter) {
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
export const onDeleteRatchet = /* GraphQL */ `
  subscription OnDeleteRatchet($filter: ModelSubscriptionRatchetFilterInput) {
    onDeleteRatchet(filter: $filter) {
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
export const onCreateBuckle = /* GraphQL */ `
  subscription OnCreateBuckle($filter: ModelSubscriptionBuckleFilterInput) {
    onCreateBuckle(filter: $filter) {
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
export const onUpdateBuckle = /* GraphQL */ `
  subscription OnUpdateBuckle($filter: ModelSubscriptionBuckleFilterInput) {
    onUpdateBuckle(filter: $filter) {
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
export const onDeleteBuckle = /* GraphQL */ `
  subscription OnDeleteBuckle($filter: ModelSubscriptionBuckleFilterInput) {
    onDeleteBuckle(filter: $filter) {
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
export const onCreateDRing = /* GraphQL */ `
  subscription OnCreateDRing($filter: ModelSubscriptionDRingFilterInput) {
    onCreateDRing(filter: $filter) {
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
export const onUpdateDRing = /* GraphQL */ `
  subscription OnUpdateDRing($filter: ModelSubscriptionDRingFilterInput) {
    onUpdateDRing(filter: $filter) {
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
export const onDeleteDRing = /* GraphQL */ `
  subscription OnDeleteDRing($filter: ModelSubscriptionDRingFilterInput) {
    onDeleteDRing(filter: $filter) {
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
export const onCreateReleaseBuckle = /* GraphQL */ `
  subscription OnCreateReleaseBuckle(
    $filter: ModelSubscriptionReleaseBuckleFilterInput
  ) {
    onCreateReleaseBuckle(filter: $filter) {
      id
      name
      number
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateReleaseBuckle = /* GraphQL */ `
  subscription OnUpdateReleaseBuckle(
    $filter: ModelSubscriptionReleaseBuckleFilterInput
  ) {
    onUpdateReleaseBuckle(filter: $filter) {
      id
      name
      number
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteReleaseBuckle = /* GraphQL */ `
  subscription OnDeleteReleaseBuckle(
    $filter: ModelSubscriptionReleaseBuckleFilterInput
  ) {
    onDeleteReleaseBuckle(filter: $filter) {
      id
      name
      number
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateZipper = /* GraphQL */ `
  subscription OnCreateZipper($filter: ModelSubscriptionZipperFilterInput) {
    onCreateZipper(filter: $filter) {
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
export const onUpdateZipper = /* GraphQL */ `
  subscription OnUpdateZipper($filter: ModelSubscriptionZipperFilterInput) {
    onUpdateZipper(filter: $filter) {
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
export const onDeleteZipper = /* GraphQL */ `
  subscription OnDeleteZipper($filter: ModelSubscriptionZipperFilterInput) {
    onDeleteZipper(filter: $filter) {
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
export const onCreateZipperChain = /* GraphQL */ `
  subscription OnCreateZipperChain(
    $filter: ModelSubscriptionZipperChainFilterInput
  ) {
    onCreateZipperChain(filter: $filter) {
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
export const onUpdateZipperChain = /* GraphQL */ `
  subscription OnUpdateZipperChain(
    $filter: ModelSubscriptionZipperChainFilterInput
  ) {
    onUpdateZipperChain(filter: $filter) {
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
export const onDeleteZipperChain = /* GraphQL */ `
  subscription OnDeleteZipperChain(
    $filter: ModelSubscriptionZipperChainFilterInput
  ) {
    onDeleteZipperChain(filter: $filter) {
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
export const onCreateEdge = /* GraphQL */ `
  subscription OnCreateEdge($filter: ModelSubscriptionEdgeFilterInput) {
    onCreateEdge(filter: $filter) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEdge = /* GraphQL */ `
  subscription OnUpdateEdge($filter: ModelSubscriptionEdgeFilterInput) {
    onUpdateEdge(filter: $filter) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEdge = /* GraphQL */ `
  subscription OnDeleteEdge($filter: ModelSubscriptionEdgeFilterInput) {
    onDeleteEdge(filter: $filter) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTotal = /* GraphQL */ `
  subscription OnCreateTotal($filter: ModelSubscriptionTotalFilterInput) {
    onCreateTotal(filter: $filter) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTotal = /* GraphQL */ `
  subscription OnUpdateTotal($filter: ModelSubscriptionTotalFilterInput) {
    onUpdateTotal(filter: $filter) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTotal = /* GraphQL */ `
  subscription OnDeleteTotal($filter: ModelSubscriptionTotalFilterInput) {
    onDeleteTotal(filter: $filter) {
      id
      name
      quantity
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateWorkOrderCounter = /* GraphQL */ `
  subscription OnCreateWorkOrderCounter(
    $filter: ModelSubscriptionWorkOrderCounterFilterInput
  ) {
    onCreateWorkOrderCounter(filter: $filter) {
      counterName
      currentValue
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateWorkOrderCounter = /* GraphQL */ `
  subscription OnUpdateWorkOrderCounter(
    $filter: ModelSubscriptionWorkOrderCounterFilterInput
  ) {
    onUpdateWorkOrderCounter(filter: $filter) {
      counterName
      currentValue
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteWorkOrderCounter = /* GraphQL */ `
  subscription OnDeleteWorkOrderCounter(
    $filter: ModelSubscriptionWorkOrderCounterFilterInput
  ) {
    onDeleteWorkOrderCounter(filter: $filter) {
      counterName
      currentValue
      createdAt
      updatedAt
      __typename
    }
  }
`;
