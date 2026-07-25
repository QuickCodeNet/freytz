IF OBJECT_ID(N'dbo.DRIVERS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[DRIVERS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [NAME] nvarchar(250) NOT NULL,
        [SURNAME] nvarchar(250) NOT NULL,
        [DRIVER_LICENSE_ID] nvarchar(250) NOT NULL,
        [EMAIL] nvarchar(500) NOT NULL,
        [PASSWORD] nvarchar(1000) NOT NULL,
        [GSM] nvarchar(50) NOT NULL,
        [DRIVER_ADDRESS] nvarchar(max) NOT NULL,
        [ADDRESS_STATE] nvarchar(50) NOT NULL,
        [STATE_ID] int NOT NULL DEFAULT '1',
        [DRIVER_STATUS] nvarchar(50) NOT NULL,
        [VEHICLE_TYPE_ID] int NOT NULL,
        [PHOTO] nvarchar(500) NOT NULL,
        [DRIVER_LICENSE_PHOTO] nvarchar(500) NOT NULL,
        [VEHICLE_PLATE] nvarchar(50) NOT NULL,
        [VEHICLE_BRAND] nvarchar(250) NOT NULL,
        [VEHICLE_INSURANCE] nvarchar(500) NOT NULL,
        [VEHICLE_REGISTRATION] nvarchar(500) NOT NULL,
        [SOCIAL_SECURITY_NUMBER] nvarchar(50) NOT NULL,
        [DEVICE_TYPE] nvarchar(50) NOT NULL,
        [DEVICE_ID] nvarchar(1000) NOT NULL,
        [FIREBASE_ID] nvarchar(1000) NOT NULL,
        [LAST_LOCATION_ID] int NOT NULL,
        [STATUS] nvarchar(50) NOT NULL DEFAULT 'ACTIVE',
        [MAX_DISTANCE] int NOT NULL DEFAULT '15',
        [PAYMENT_ACCOUNT_INFO] nvarchar(1000) NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_DRIVERS] PRIMARY KEY ([ID])
    );
END;