IF OBJECT_ID(N'dbo.CUSTOMER_LOGIN_ATTEMPTS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[CUSTOMER_LOGIN_ATTEMPTS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [CUSTOMER_ID] int NOT NULL,
        [CLIENT_IP] nvarchar(50) NOT NULL,
        [LOGIN_DATE] datetime2(7) NOT NULL,
        [ATTEMPT_RESULT] nvarchar(50) NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_CUSTOMER_LOGIN_ATTEMPTS] PRIMARY KEY ([ID])
    );
END;