const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'postgres'
});


const  getRestaurantPlates = async (req, res) => {
    const idRestaurante = req.params.id;
    response = await pool.query('SELECT * FROM Plate WHERE fk_idrestaurant = $1', [idRestaurante]);
    res.json(response.rows)
};

const  getPlates = async (req, res) => {
    response = await pool.query('SELECT * FROM Plate');
    res.json(response.rows)
};

const  getIngredients = async (req, res) => {
    response = await pool.query('SELECT * FROM ingredient');
    res.json(response.rows)
};

const  getPlatesType = async (req, res) => {
    const idType = req.params.id;
    response = await pool.query('SELECT * FROM Plate WHERE fk_idtypeplate = $1', [idType]);
    res.json(response.rows)
};

const createPlate = async (req, res) => {
    const { FK_idTypePlate, FK_idRestaurant, plateName, plateDescription, amount, ingredients, imageplate} = req.body;
    const response1 = await pool.query('INSERT INTO plate (FK_idTypePlate, FK_idRestaurant, plateName, plateDescription, amount,imageplate) VALUES ($1, $2, $3, $4, $5, $6)', [FK_idTypePlate,FK_idRestaurant,plateName, plateDescription, amount,imageplate]);
    const idPlato = await pool.query('SELECT pk_idplate from plate WHERE FK_idRestaurant = $1 AND plateName = $2', [FK_idRestaurant,plateName]);
    
    for(var i = 0; i < ingredients.length; i++){
        const response2 = await pool.query('INSERT INTO Plate_Ingredients (FK_idPlate, FK_idIngredient) VALUES ($1, $2)', [idPlato.rows[0].pk_idplate, ingredients[i].pk_idingredient]);
    };

    res.json({
        message: 'Plato creado'
    });
};

const createIngredient = async(req, res) => {
    const {ingredientname, description} = req.body;

    const response = await pool.query('INSERT INTO ingredient (ingredientname, description) VALUES ($1, $2)', [ingredientname, description]);

    res.json({
        message: 'Ingrediente creado'
    });

};

const updatePlate = async(req, res) => {
    const id = req.params.id;
    const { fk_idtypeplate, fk_idrestaurant, platename, platedescription, amount, ingredients,imageplate} = req.body;
    const response1 = await pool.query('UPDATE plate SET FK_idTypePlate = $1, FK_idRestaurant = $2, plateName = $3, plateDescription = $4, amount = $5, imageplate = $7 WHERE pk_idplate = $6',[fk_idtypeplate, fk_idrestaurant, platename, platedescription, amount, id, imageplate]);
    const response2 = await pool.query('DELETE FROM Plate_Ingredients WHERE FK_idPlate = $1', [id]);
    for(var i = 0; i < ingredients.length; i++){
        const response2 = await pool.query('INSERT INTO Plate_Ingredients (FK_idPlate, FK_idIngredient) VALUES ($1, $2)', [id, ingredients[i].pk_idingredient]);
    };
    res.json({
        message: 'Plato modificado'
    });
};

const updateIngredient = async(req, res) => {
    const id = req.params.id;
    const {ingredientname, description} = req.body;

    const response = await pool.query('UPDATE ingredient SET ingredientname = $1, description = $2 WHERE pk_idingredient = $3', [ingredientname, description, id]);

    res.json({
        message: 'Ingrediente modificado'
    });
};

const deletePlate = async(req, res) => {
    const id = req.params.id;

    const response = pool.query('UPDATE plate SET active = FALSE WHERE pk_idplate = $1', [id]);

    res.json({
        message: 'Plato Eliminado'
    });
};

const deleteIngredient = async(req, res) => {
    const id = req.params.id;

    const response = pool.query('UPDATE ingredient SET active = FALSE WHERE pk_idingredient = $1', [id]);

    res.json({
        message: 'Ingrediente Eliminado'
    });
};


module.exports = {
    getRestaurantPlates,
    getPlates,
    getIngredients,
    getPlatesType,
    createPlate,
    createIngredient,
    updatePlate,
    updateIngredient,
    deletePlate,
    deleteIngredient
}