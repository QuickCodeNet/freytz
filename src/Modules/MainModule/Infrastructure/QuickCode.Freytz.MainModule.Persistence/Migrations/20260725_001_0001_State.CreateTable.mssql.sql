IF OBJECT_ID(N'dbo.STATES', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[STATES] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [NAME] nvarchar(250) NOT NULL,
        [SHORT_NAME] nvarchar(50) NOT NULL,
        [TIME_ZONE] nvarchar(250) NOT NULL,
        [STATUS] nvarchar(50) NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_STATES] PRIMARY KEY ([ID])
    );
END;