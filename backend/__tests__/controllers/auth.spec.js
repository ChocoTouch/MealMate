const { Sequelize } = require('sequelize')
const request = require('supertest')

const { register } = require('../../controllers/auth')

const sequelize = new Sequelize(
    "mealmate_test",
    "root",
    "root",
    {
    port: 8000,
    dialect: "mysql",
    logging: false,
    storage:':memory:'

})
const User = require('../../models/user')(sequelize, Sequelize)

const baseURL = "http://localhost:8000"

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

beforeEach(async () => {
    req = request(baseURL);
});
 
const response = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x),
    message: "test",
}

const next = (err) => expect(err).toBeFalsy();

it('should send a status code of 400 when user exists', async () => {
    User.findOne.mockImplementationOnce(() =>({
        id: 1,
        email: 'email',
        password: 'password',
    }));
    User.hasMany.mockImplementationOnce(() =>(Recipe, { foreignKey: "user_id" }));
    await register(request,response,next());
    expect(response.status).toHaveBeenCalledWith(401);
})