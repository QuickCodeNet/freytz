IF OBJECT_ID(N'dbo.SM_OTPS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[SM_OTPS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [GSM_NUMBER] nvarchar(50) NOT NULL,
        [SMS_CODE] nvarchar(250) NOT NULL,
        [SMS_DATE] datetime2(7) NOT NULL,
        [SMS_VALID_SECOND] int NOT NULL,
        [MESSAGE_SID] nvarchar(250) NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_SM_OTPS] PRIMARY KEY ([ID])
    );
END;