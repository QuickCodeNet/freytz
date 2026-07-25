IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.SM_OTPS', N'U') AND name = N'IX_SM_OTPS_IsDeleted')
BEGIN
    CREATE INDEX [IX_SM_OTPS_IsDeleted] ON [dbo].[SM_OTPS] ([IsDeleted]);
END