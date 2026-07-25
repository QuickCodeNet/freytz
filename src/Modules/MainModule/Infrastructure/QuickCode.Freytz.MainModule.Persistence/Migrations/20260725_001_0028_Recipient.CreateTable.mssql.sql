IF OBJECT_ID(N'dbo.RECIPIENTS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[RECIPIENTS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [CUSTOMER_ID] int NOT NULL,
        [NAME] nvarchar(250) NOT NULL,
        [GSM] nvarchar(50) NOT NULL,
        [EMAIL] nvarchar(500) NOT NULL,
        [INSTRUCTIONS] nvarchar(max) NOT NULL,
        [IS_STORED] bit NOT NULL DEFAULT 0,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_RECIPIENTS] PRIMARY KEY ([ID])
    );
END;