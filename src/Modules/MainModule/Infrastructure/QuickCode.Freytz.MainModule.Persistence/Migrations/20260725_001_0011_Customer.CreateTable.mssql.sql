IF OBJECT_ID(N'dbo.CUSTOMERS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[CUSTOMERS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [NAME] nvarchar(250) NOT NULL,
        [SURNAME] nvarchar(250) NOT NULL,
        [COMPANY_NAME] nvarchar(1000) NOT NULL,
        [EMAIL] nvarchar(500) NOT NULL,
        [PASSWORD] nvarchar(1000) NOT NULL,
        [GSM] nvarchar(50) NOT NULL,
        [PHOTO] nvarchar(500) NOT NULL,
        [PROFILE_ID] nvarchar(250) NOT NULL,
        [DEVICE_TYPE] nvarchar(50) NOT NULL,
        [DEVICE_ID] nvarchar(1000) NOT NULL,
        [FIREBASE_ID] nvarchar(1000) NOT NULL,
        [STATUS] nvarchar(50) NULL DEFAULT 'ACTIVE',
        [ADDRESS] nvarchar(max) NOT NULL,
        [STATE_ID] int NOT NULL DEFAULT '1',
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_CUSTOMERS] PRIMARY KEY ([ID])
    );
END;