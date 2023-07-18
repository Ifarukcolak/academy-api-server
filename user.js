const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('User', {  
     //define() yöntemi, bir model nesnesi oluşturur.
    // Model nesnesi, veritabanındaki bir tabloyu temsil eder. Model nesnesi, tablonun sütunlarını, kısıtlamalarını ve diğer özelliklerini tanımlar.
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
  });
  
  User.sync({force: true});
   //User modelini veritabanına senkronize eder.
   // Force: true parametresi, tablonun zaten var olup olmadığına bakılmaksızın silinip yeniden oluşturulmasını sağlar.