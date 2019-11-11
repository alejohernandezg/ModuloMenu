-- Last modification date: 2019-09-18 18:01:41.091

-- tables
-- Table: Ingredient
CREATE TABLE Ingredient (
    PK_idIngredient SERIAL  NOT NULL,
    ingredientName varchar(50)  NOT NULL,
    description varchar(100)  NOT NULL,
    active BOOLEAN  NULL  DEFAULT TRUE,
    CONSTRAINT Ingredientes_pk PRIMARY KEY (PK_idIngredient)
);

-- Table: Plate
CREATE TABLE Plate (
    PK_idPlate SERIAL  NOT NULL,
    FK_idTypePlate int  NOT NULL,
    FK_idRestaurant int  NOT NULL,
    plateName varchar(50)  NOT NULL,
    plateDescription varchar(200)  NOT NULL,
    amount int  NOT NULL,
    active BOOLEAN NULL DEFAULT TRUE,
    imagePlate VARCHAR(200) NULL,
    CONSTRAINT Platos_pk PRIMARY KEY (PK_idPlate)
);

-- Table: Plate_Ingredients
CREATE TABLE Plate_Ingredients (
    PK_idPlateXIngredient SERIAL  NOT NULL,
    FK_idPlate int  NOT NULL,
    FK_idIngredient int  NOT NULL,
    CONSTRAINT PlatosXIngredientes_pk PRIMARY KEY (PK_idPlateXIngredient)
);

-- Table: TypeOfPlate
CREATE TABLE TypeOfPlate (
    PK_idTypeOfPlate SERIAL  NOT NULL,
    typeName varchar(50)  NOT NULL,
    description varchar(200)  NOT NULL,
    CONSTRAINT TiposPlato_pk PRIMARY KEY (PK_idTypeOfPlate)
);

-- foreign keys
-- Reference: PlatosXIngredientes_Ingredientes (table: Plate_Ingredients)
ALTER TABLE Plate_Ingredients ADD CONSTRAINT PlatosXIngredientes_Ingredientes
    FOREIGN KEY (FK_idIngredient)
    REFERENCES Ingredient (PK_idIngredient)  
;

-- Reference: PlatosXIngredientes_Platos (table: Plate_Ingredients)
ALTER TABLE Plate_Ingredients ADD CONSTRAINT PlatosXIngredientes_Platos
    FOREIGN KEY (FK_idPlate)
    REFERENCES Plate (PK_idPlate)
;

-- Reference: Platos_TiposPlato (table: Plate)
ALTER TABLE Plate ADD CONSTRAINT Platos_TiposPlato
    FOREIGN KEY (FK_idTypePlate)
    REFERENCES TypeOfPlate (PK_idTypeOfPlate);
-- End of file.
