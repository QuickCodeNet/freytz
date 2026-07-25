IF OBJECT_ID(N'dbo.DRIVER_LOCATIONS', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[DRIVER_LOCATIONS] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [DRIVER_ID] int NOT NULL,
        [LOCATION_DATE] datetime2(7) NULL DEFAULT GETDATE(),
        [LONGITUDE] decimal(18,8) NOT NULL,
        [LATITUDE] decimal(18,8) NOT NULL,
        [DRIVER_LOCATION_DATE] datetime2(7) NOT NULL,
        [BEARING] decimal(18,8) NOT NULL,
        [SPEED] decimal(18,8) NOT NULL,
        [ACCURACY] decimal(18,8) NOT NULL,
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_DRIVER_LOCATIONS] PRIMARY KEY ([ID])
    );
END;