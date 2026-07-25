IF OBJECT_ID(N'dbo.PRICE_MATRICES', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[PRICE_MATRICES] (
        [ID] int IDENTITY(1,1) NOT NULL,
        [RANGE_PRICE] decimal(18,2) NOT NULL,
        [ROUND_TRIP_PRICE] decimal(18,2) NOT NULL,
        [RANGE_END] decimal(18,2) NOT NULL,
        [STATE_ID] int NOT NULL DEFAULT '1',
        [VEHICLE_TYPE_ID] int NOT NULL DEFAULT '1',
        [IsDeleted] bit NOT NULL DEFAULT 0,
        [DeletedOnUtc] datetime2(7) NULL,
        CONSTRAINT [PK_PRICE_MATRICES] PRIMARY KEY ([ID])
    );
END;