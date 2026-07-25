IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.LOCATIONS', N'U') AND name = N'IX_LOCATIONS_IsDeleted')
BEGIN
    CREATE INDEX [IX_LOCATIONS_IsDeleted] ON [dbo].[LOCATIONS] ([IsDeleted]);
END