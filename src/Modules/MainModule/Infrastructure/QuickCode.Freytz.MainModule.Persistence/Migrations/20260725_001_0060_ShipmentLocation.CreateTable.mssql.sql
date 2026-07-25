IF OBJECT_ID(N'dbo.SHIPMENT_LOCATIONS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[SHIPMENT_LOCATIONS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [SHIPMENT_ID] int NOT NULL,
        [LOCATION_ID] int NOT NULL,
        [SHIPMENT_ORDER] int NOT NULL,
        [LOCATION_STATUS] nvarchar(50) NOT NULL,
        [ACTIVITY_TIME] datetime2(7) NOT NULL,
        [IS_COMPLETED] bit NOT NULL,
        [PACKAGE_ID] int NOT NULL,
        [PACKAGE_ACTIVITY] nvarchar(50) NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_SHIPMENT_LOCATIONS] PRIMARY KEY ([ID])
    );
END;