const {Sequelize}=require('sequelize'); 
const sequelize = new Sequelize('ACADEMY', 'academy', 'qGpT3#5Passw0rd!', {
    host: '20.84.121.38',
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
 async function name (){
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
name();
