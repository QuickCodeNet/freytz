IF OBJECT_ID(N'dbo.PAYMENTS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[PAYMENTS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [PAYMENT_TYPE] nvarchar(50) NOT NULL,
        [PAYMENT_STATUS] nvarchar(50) NOT NULL,
        [PAYMENT_TIME] datetime2(7) NOT NULL,
        [AMOUNT] decimal(18,2) NOT NULL,
        [TAX_AMOUNT] decimal(18,2) NOT NULL,
        [TOTAL_AMOUNT] decimal(18,2) NOT NULL,
        [CREDIT_CARD_ID] int NOT NULL,
        [CC_PAYMENT_TIME] datetime2(7) NOT NULL,
        [CC_REF_NO] nvarchar(250) NOT NULL,
        [PAYMENT_REF] nvarchar(250) NOT NULL,
        [CAPTURED_AMOUNT] decimal(18,2) NOT NULL DEFAULT '0',
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_PAYMENTS] PRIMARY KEY ([ID])
    );
END;