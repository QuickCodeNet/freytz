IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.DRIVERS', N'U') AND name = N'IX_DRIVERS_IsDeleted')
BEGIN
    CREATE INDEX [IX_DRIVERS_IsDeleted] ON [dbo].[DRIVERS] ([IsDeleted]);
END