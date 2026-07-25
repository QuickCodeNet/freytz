IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.CUSTOMERS', N'U') AND name = N'IX_CUSTOMERS_IsDeleted')
BEGIN
    CREATE INDEX [IX_CUSTOMERS_IsDeleted] ON [dbo].[CUSTOMERS] ([IsDeleted]);
END