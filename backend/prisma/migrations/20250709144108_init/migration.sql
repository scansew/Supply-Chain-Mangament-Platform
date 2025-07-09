-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('CNC', 'SCANNING', 'DESIGN', 'MANUFACTURING', 'WAREHOUSE', 'DEALER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "roleType" AS ENUM ('new', 'sAdmin', 'cAdmin', 'emp');

-- CreateEnum
CREATE TYPE "WorkOrderStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "WorkOrderType" AS ENUM ('Ratchet_Mooring', 'Ratchet_Travel', 'Ratchet_Winter_Storage', 'Snap_or_hardware_Full', 'Snap_or_hardware_separate_bow_and_cockpit', 'Boat_Seat_Covers', 'OTHER');

-- CreateEnum
CREATE TYPE "WorkflowStages" AS ENUM ('SCANNING', 'DESIGN', 'CNC', 'MANUFACTURING', 'WAREHOUSE');

-- CreateEnum
CREATE TYPE "StageStatus" AS ENUM ('QUEUED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'EXCEPTION');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "companySecret" TEXT NOT NULL,
    "stripeConnectId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyRole" (
    "id" TEXT NOT NULL,
    "roleId" "CompanyType",
    "companyId" TEXT NOT NULL,
    "shippingAddress" TEXT,
    "private" BOOLEAN,
    "isActive" BOOLEAN,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CompanyRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "family_name" TEXT,
    "given_name" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "role" "roleType",
    "companyId" TEXT,
    "companyName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "id" TEXT NOT NULL,
    "woNumber" INTEGER NOT NULL,
    "createdById" TEXT NOT NULL,
    "assignedToId" TEXT,
    "companyId" TEXT,
    "CNCId" TEXT,
    "manId" TEXT,
    "status" "WorkOrderStatus",
    "filesFolder" TEXT,
    "type" "WorkOrderType",
    "details" TEXT,
    "materialSelection" JSONB,
    "estimatedPrice" DOUBLE PRECISION,
    "msrp" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "process" TEXT,
    "make" TEXT,
    "model" TEXT,
    "year" INTEGER,
    "crmClientId" TEXT,
    "rawImages" TEXT[],
    "rawDesignImages" TEXT[],
    "description" TEXT,
    "materialPrice" DOUBLE PRECISION,
    "manufacturePrice" DOUBLE PRECISION,
    "raw3dModel" TEXT,
    "designPhotos" TEXT[],
    "outline3dModel" TEXT,
    "approved3dModel" TEXT,
    "main2dPattern" TEXT,
    "billOfMaterials" JSONB,
    "cnc2dPattern" TEXT,
    "scanInfo" JSONB,
    "businessName" TEXT,
    "attnName" TEXT,
    "businessPhone" TEXT,
    "businessShippingAddress" TEXT,
    "customerName" TEXT,
    "customerDropShippingAddress" TEXT,
    "shippingTrackingInfo" TEXT,
    "currentStage" "WorkflowStages",
    "currentStageId" TEXT,
    "estimatedCompletionDate" TIMESTAMP(3),

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowStage" (
    "id" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "stage" "WorkflowStages" NOT NULL,
    "status" "StageStatus" NOT NULL,
    "companyId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "estimatedCompletionDate" TIMESTAMP(3),
    "notes" TEXT,
    "attn" TEXT,
    "qualityCheck" BOOLEAN,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "priority" INTEGER,
    "estimatedDuration" INTEGER,

    CONSTRAINT "WorkflowStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StageUpdate" (
    "id" TEXT NOT NULL,
    "workflowStageId" TEXT NOT NULL,
    "status" "StageStatus" NOT NULL,
    "notes" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "updatedById" TEXT NOT NULL,

    CONSTRAINT "StageUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "stripePaymentId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "materialName" TEXT NOT NULL,
    "measurements" DOUBLE PRECISION,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialPricing" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "materialName" TEXT NOT NULL,
    "pricePerYard" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MaterialPricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Miscellaneous" (
    "id" TEXT NOT NULL,
    "miscName" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION,

    CONSTRAINT "Miscellaneous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ratchet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" DOUBLE PRECISION NOT NULL,
    "webbing" DOUBLE PRECISION NOT NULL,
    "binding" DOUBLE PRECISION NOT NULL,
    "otherA" DOUBLE PRECISION NOT NULL,
    "otherB" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ratchet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buckle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" DOUBLE PRECISION NOT NULL,
    "webbing" DOUBLE PRECISION NOT NULL,
    "binding" DOUBLE PRECISION NOT NULL,
    "otherA" DOUBLE PRECISION NOT NULL,
    "otherB" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Buckle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DRing" (
    "id" TEXT NOT NULL,
    "dRingTotal" DOUBLE PRECISION,
    "name" TEXT NOT NULL,
    "number" DOUBLE PRECISION NOT NULL,
    "webbing" DOUBLE PRECISION NOT NULL,
    "strap" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DRing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseBuckle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ReleaseBuckle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zipper" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "number" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Zipper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZipperChain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "measurements" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ZipperChain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Total" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Total_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrderCounter" (
    "counterName" TEXT NOT NULL,
    "currentValue" INTEGER NOT NULL,

    CONSTRAINT "WorkOrderCounter_pkey" PRIMARY KEY ("counterName")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_companySecret_key" ON "Company"("companySecret");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CompanyRole" ADD CONSTRAINT "CompanyRole_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_CNCId_fkey" FOREIGN KEY ("CNCId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_manId_fkey" FOREIGN KEY ("manId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_crmClientId_fkey" FOREIGN KEY ("crmClientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStage" ADD CONSTRAINT "WorkflowStage_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowStage" ADD CONSTRAINT "WorkflowStage_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageUpdate" ADD CONSTRAINT "StageUpdate_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StageUpdate" ADD CONSTRAINT "StageUpdate_workflowStageId_fkey" FOREIGN KEY ("workflowStageId") REFERENCES "WorkflowStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialPricing" ADD CONSTRAINT "MaterialPricing_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
