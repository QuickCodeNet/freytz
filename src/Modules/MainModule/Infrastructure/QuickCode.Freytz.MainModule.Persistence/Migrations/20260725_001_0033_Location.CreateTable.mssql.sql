IF OBJECT_ID(N'dbo.LOCATIONS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[LOCATIONS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [CUSTOMER_ID] int NOT NULL,
        [ADDRESS_TEXT] nvarchar(max) NOT NULL,
        [LATITUDE] decimal(18,8) NOT NULL,
        [LONGITUDE] decimal(18,8) NOT NULL,
        [SUITE_NUMBER] nvarchar(50) NOT NULL,
        [ADDRESS_DESCRIPTION] nvarchar(max) NOT NULL,
        [ALIAS_NAME] nvarchar(250) NOT NULL,
        [PLACE_ID] nvarchar(250) NOT NULL,
        [STATE_ID] int NOT NULL DEFAULT '1',
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_LOCATIONS] PRIMARY KEY ([ID])
    );
END;