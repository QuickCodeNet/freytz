IF OBJECT_ID(N'dbo.SENDERS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[SENDERS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [CUSTOMER_ID] int NOT NULL,
        [NAME] nvarchar(250) NOT NULL,
        [GSM] nvarchar(50) NOT NULL,
        [EMAIL] nvarchar(500) NOT NULL,
        [IS_STORED] bit NOT NULL DEFAULT 0,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_SENDERS] PRIMARY KEY ([ID])
    );
END;