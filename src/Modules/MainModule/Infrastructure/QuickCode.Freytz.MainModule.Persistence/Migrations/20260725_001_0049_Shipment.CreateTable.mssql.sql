IF OBJECT_ID(N'dbo.SHIPMENTS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[SHIPMENTS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [CUSTOMER_ID] int NOT NULL,
        [DRIVER_ID] int NOT NULL,
        [SHIPMENT_TYPE] nvarchar(50) NOT NULL,
        [CREATE_DATE] datetime2(7) NOT NULL,
        [START_DATE] datetime2(7) NOT NULL,
        [FINISH_DATE] datetime2(7) NOT NULL,
        [PLANNED_ARRIVE_TIME] datetime2(7) NOT NULL,
        [SHIPMENT_STATUS] nvarchar(50) NOT NULL,
        [PAYMENT_ID] int NOT NULL,
        [PLANNED_DURATION] nvarchar(50) NOT NULL,
        [TOTAL_DISTANCE] decimal(18,2) NOT NULL,
        [DRIVER_INSTRUCTIONS] nvarchar(max) NOT NULL,
        [STATE_ID] int NOT NULL DEFAULT '1',
        [VEHICLE_TYPE_ID] int NOT NULL DEFAULT '1',
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_SHIPMENTS] PRIMARY KEY ([ID])
    );
END;