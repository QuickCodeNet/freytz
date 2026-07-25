IF OBJECT_ID(N'dbo.VEHICLE_TYPES', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[VEHICLE_TYPES] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [NAME] nvarchar(250) NOT NULL,
        [CAPACITY] int NOT NULL,
        [IS_DELETED] bit NOT NULL DEFAULT 0,
        [ORDER] int NOT NULL DEFAULT '1',
        [IMAGE_PATH] nvarchar(500) NOT NULL,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_VEHICLE_TYPES] PRIMARY KEY ([ID])
    );
END;