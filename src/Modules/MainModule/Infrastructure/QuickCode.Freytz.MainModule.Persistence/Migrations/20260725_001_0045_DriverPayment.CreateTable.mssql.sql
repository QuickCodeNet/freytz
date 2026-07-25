IF OBJECT_ID(N'dbo.DRIVER_PAYMENTS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[DRIVER_PAYMENTS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [DRIVER_ID] int NOT NULL,
        [PAYMENT_ACCOUNT] nvarchar(1000) NOT NULL,
        [PAYMENT_AMOUNT] decimal(18,2) NOT NULL,
        [PAYMENT_DATE] datetime2(7) NOT NULL,
        [PAYMENT_DESCRIPTION] nvarchar(max) NOT NULL,
        [USER_ID] int NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_DRIVER_PAYMENTS] PRIMARY KEY ([ID])
    );
END;