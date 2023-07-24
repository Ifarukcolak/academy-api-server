const {Sequelize}=require('sequelize'); 
const sequelize = new Sequelize('ACADEMY', 'academy', 'qGpT3#5Passw0rd!', {
    host: '146.190.56.86',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            requestTimeout: 120000,
            connectTimeout: 120000,
        },
    },
    pool: {
        max: 100,
        min: 0,
        idle: 10000
    },
});
module.exports=sequelize;
