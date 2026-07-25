IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_ApiMethodAccessGrants_PermissionGroups_PermissionGroupName' AND parent_object_id = OBJECT_ID(N'dbo.ApiMethodAccessGrants'))
BEGIN
    ALTER TABLE [dbo].[ApiMethodAccessGrants] ADD CONSTRAINT [FK_ApiMethodAccessGrants_PermissionGroups_PermissionGroupName] FOREIGN KEY ([PermissionGroupName]) REFERENCES [dbo].[PermissionGroups] ([Name]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_ApiMethodAccessGrants_ApiMethodDefinitions_ApiMethodDefinitionKey' AND parent_object_id = OBJECT_ID(N'dbo.ApiMethodAccessGrants'))
BEGIN
    ALTER TABLE [dbo].[ApiMethodAccessGrants] ADD CONSTRAINT [FK_ApiMethodAccessGrants_ApiMethodDefinitions_ApiMethodDefinitionKey] FOREIGN KEY ([ApiMethodDefinitionKey]) REFERENCES [dbo].[ApiMethodDefinitions] ([Key]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_ApiMethodDefinitions_Modules_ModuleName' AND parent_object_id = OBJECT_ID(N'dbo.ApiMethodDefinitions'))
BEGIN
    ALTER TABLE [dbo].[ApiMethodDefinitions] ADD CONSTRAINT [FK_ApiMethodDefinitions_Modules_ModuleName] FOREIGN KEY ([ModuleName]) REFERENCES [dbo].[Modules] ([Name]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_ApiMethodDefinitions_Models_ModelName_ModuleName' AND parent_object_id = OBJECT_ID(N'dbo.ApiMethodDefinitions'))
BEGIN
    ALTER TABLE [dbo].[ApiMethodDefinitions] ADD CONSTRAINT [FK_ApiMethodDefinitions_Models_ModelName_ModuleName] FOREIGN KEY ([ModelName], [ModuleName]) REFERENCES [dbo].[Models] ([Name], [ModuleName]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_AspNetRoleClaims_AspNetRoles_RoleId' AND parent_object_id = OBJECT_ID(N'dbo.AspNetRoleClaims'))
BEGIN
    ALTER TABLE [dbo].[AspNetRoleClaims] ADD CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_AspNetUsers_PermissionGroups_PermissionGroupName' AND parent_object_id = OBJECT_ID(N'dbo.AspNetUsers'))
BEGIN
    ALTER TABLE [dbo].[AspNetUsers] ADD CONSTRAINT [FK_AspNetUsers_PermissionGroups_PermissionGroupName] FOREIGN KEY ([PermissionGroupName]) REFERENCES [dbo].[PermissionGroups] ([Name]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_AspNetUserClaims_AspNetUsers_UserId' AND parent_object_id = OBJECT_ID(N'dbo.AspNetUserClaims'))
BEGIN
    ALTER TABLE [dbo].[AspNetUserClaims] ADD CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_AspNetUserLogins_AspNetUsers_UserId' AND parent_object_id = OBJECT_ID(N'dbo.AspNetUserLogins'))
BEGIN
    ALTER TABLE [dbo].[AspNetUserLogins] ADD CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_AspNetUserRoles_AspNetUsers_UserId' AND parent_object_id = OBJECT_ID(N'dbo.AspNetUserRoles'))
BEGIN
    ALTER TABLE [dbo].[AspNetUserRoles] ADD CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_AspNetUserRoles_AspNetRoles_RoleId' AND parent_object_id = OBJECT_ID(N'dbo.AspNetUserRoles'))
BEGIN
    ALTER TABLE [dbo].[AspNetUserRoles] ADD CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_AspNetUserTokens_AspNetUsers_UserId' AND parent_object_id = OBJECT_ID(N'dbo.AspNetUserTokens'))
BEGIN
    ALTER TABLE [dbo].[AspNetUserTokens] ADD CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_KafkaEvents_ApiMethodDefinitions_ApiMethodDefinitionKey' AND parent_object_id = OBJECT_ID(N'dbo.KafkaEvents'))
BEGIN
    ALTER TABLE [dbo].[KafkaEvents] ADD CONSTRAINT [FK_KafkaEvents_ApiMethodDefinitions_ApiMethodDefinitionKey] FOREIGN KEY ([ApiMethodDefinitionKey]) REFERENCES [dbo].[ApiMethodDefinitions] ([Key]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_Models_Modules_ModuleName' AND parent_object_id = OBJECT_ID(N'dbo.Models'))
BEGIN
    ALTER TABLE [dbo].[Models] ADD CONSTRAINT [FK_Models_Modules_ModuleName] FOREIGN KEY ([ModuleName]) REFERENCES [dbo].[Modules] ([Name]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_PortalPageAccessGrants_PermissionGroups_PermissionGroupName' AND parent_object_id = OBJECT_ID(N'dbo.PortalPageAccessGrants'))
BEGIN
    ALTER TABLE [dbo].[PortalPageAccessGrants] ADD CONSTRAINT [FK_PortalPageAccessGrants_PermissionGroups_PermissionGroupName] FOREIGN KEY ([PermissionGroupName]) REFERENCES [dbo].[PermissionGroups] ([Name]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_PortalPageAccessGrants_PortalPageDefinitions_PortalPageDefinitionKey' AND parent_object_id = OBJECT_ID(N'dbo.PortalPageAccessGrants'))
BEGIN
    ALTER TABLE [dbo].[PortalPageAccessGrants] ADD CONSTRAINT [FK_PortalPageAccessGrants_PortalPageDefinitions_PortalPageDefinitionKey] FOREIGN KEY ([PortalPageDefinitionKey]) REFERENCES [dbo].[PortalPageDefinitions] ([Key]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_PortalPageDefinitions_Modules_ModuleName' AND parent_object_id = OBJECT_ID(N'dbo.PortalPageDefinitions'))
BEGIN
    ALTER TABLE [dbo].[PortalPageDefinitions] ADD CONSTRAINT [FK_PortalPageDefinitions_Modules_ModuleName] FOREIGN KEY ([ModuleName]) REFERENCES [dbo].[Modules] ([Name]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_PortalPageDefinitions_Models_ModelName_ModuleName' AND parent_object_id = OBJECT_ID(N'dbo.PortalPageDefinitions'))
BEGIN
    ALTER TABLE [dbo].[PortalPageDefinitions] ADD CONSTRAINT [FK_PortalPageDefinitions_Models_ModelName_ModuleName] FOREIGN KEY ([ModelName], [ModuleName]) REFERENCES [dbo].[Models] ([Name], [ModuleName]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_RefreshTokens_AspNetUsers_UserId' AND parent_object_id = OBJECT_ID(N'dbo.RefreshTokens'))
BEGIN
    ALTER TABLE [dbo].[RefreshTokens] ADD CONSTRAINT [FK_RefreshTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]);
END

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_TopicWorkflows_KafkaEvents_KafkaEventsTopicName' AND parent_object_id = OBJECT_ID(N'dbo.TopicWorkflows'))
BEGIN
    ALTER TABLE [dbo].[TopicWorkflows] ADD CONSTRAINT [FK_TopicWorkflows_KafkaEvents_KafkaEventsTopicName] FOREIGN KEY ([KafkaEventsTopicName]) REFERENCES [dbo].[KafkaEvents] ([TopicName]);
END