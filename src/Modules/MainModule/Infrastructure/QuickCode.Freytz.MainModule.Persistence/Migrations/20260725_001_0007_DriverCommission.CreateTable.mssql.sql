IF OBJECT_ID(N'dbo.DRIVER_COMMISSIONS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[DRIVER_COMMISSIONS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [COMMISSION] decimal(18,2) NOT NULL,
        [START_DATE] datetime2(7) NOT NULL,
        [END_DATE] datetime2(7) NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_DRIVER_COMMISSIONS] PRIMARY KEY ([ID])
    );
END;