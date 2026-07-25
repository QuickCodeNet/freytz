IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.SHIPMENTS', N'U') AND name = N'IX_SHIPMENTS_IsDeleted')
BEGIN
    CREATE INDEX [IX_SHIPMENTS_IsDeleted] ON [dbo].[SHIPMENTS] ([IsDeleted]);
END