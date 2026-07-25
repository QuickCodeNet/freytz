IF OBJECT_ID(N'dbo.SM_OTP_VALIDATIONS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[SM_OTP_VALIDATIONS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [GSM_NUMBER] nvarchar(50) NOT NULL,
        [USER_SMS_CODE] nvarchar(250) NOT NULL,
        [SMS_OTP_ID] int NOT NULL,
        [TRY_COUNT] int NOT NULL,
        [RESULT] nvarchar(50) NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_SM_OTP_VALIDATIONS] PRIMARY KEY ([ID])
    );
END;