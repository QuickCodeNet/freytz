IF OBJECT_ID(N'dbo.SM_INFOS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[SM_INFOS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [GSM_NUMBER] nvarchar(50) NOT NULL,
        [MESSAGE] nvarchar(1000) NOT NULL,
        [SMS_DATE] datetime2(7) NOT NULL,
        [MESSAGE_SID] nvarchar(250) NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_SM_INFOS] PRIMARY KEY ([ID])
    );
END;