IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.SM_INFOS', N'U') AND name = N'IX_SM_INFOS_IsDeleted')
BEGIN
    CREATE INDEX [IX_SM_INFOS_IsDeleted] ON [dbo].[SM_INFOS] ([IsDeleted]);
END