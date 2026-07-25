IF OBJECT_ID(N'dbo.CREDIT_CARDS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[CREDIT_CARDS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [CUSTOMER_ID] int NOT NULL,
        [CC_OWNER_NAME] nvarchar(250) NOT NULL,
        [CC_CARD_NO] nvarchar(1000) NOT NULL,
        [CC_VALID_DATE] nvarchar(1000) NOT NULL,
        [CC_CVC] nvarchar(1000) NOT NULL,
        [CC_SECURITY_KEY] nvarchar(1000) NOT NULL,
        [IS_STORED] bit NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_CREDIT_CARDS] PRIMARY KEY ([ID])
    );
END;