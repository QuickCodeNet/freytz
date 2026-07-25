IF OBJECT_ID(N'dbo.SHIPMENT_PACKAGES', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[SHIPMENT_PACKAGES] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [SHIPMENT_ID] int NOT NULL,
        [PACKAGE_PHOTO] nvarchar(500) NOT NULL,
        [PACKAGE_DESCRIPTION] nvarchar(1000) NOT NULL,
        [RECIPIENT_ID] int NOT NULL,
        [SENDER_ID] int NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_SHIPMENT_PACKAGES] PRIMARY KEY ([ID])
    );
END;