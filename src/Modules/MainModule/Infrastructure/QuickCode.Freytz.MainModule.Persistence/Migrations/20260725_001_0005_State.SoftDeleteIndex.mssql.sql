IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.STATES', N'U') AND name = N'IX_STATES_IsDeleted')
BEGIN
    CREATE INDEX [IX_STATES_IsDeleted] ON [dbo].[STATES] ([IsDeleted]);
END