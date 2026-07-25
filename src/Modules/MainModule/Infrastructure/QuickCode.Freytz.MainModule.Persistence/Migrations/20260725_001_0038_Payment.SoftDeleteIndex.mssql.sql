IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.PAYMENTS', N'U') AND name = N'IX_PAYMENTS_IsDeleted')
BEGIN
    CREATE INDEX [IX_PAYMENTS_IsDeleted] ON [dbo].[PAYMENTS] ([IsDeleted]);
END