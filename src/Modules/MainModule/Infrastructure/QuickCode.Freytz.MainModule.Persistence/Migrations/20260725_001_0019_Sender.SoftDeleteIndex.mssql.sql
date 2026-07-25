IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.SENDERS', N'U') AND name = N'IX_SENDERS_IsDeleted')
BEGIN
    CREATE INDEX [IX_SENDERS_IsDeleted] ON [dbo].[SENDERS] ([IsDeleted]);
END