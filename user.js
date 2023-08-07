const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const User = sequelize.define('User', {  
     //define() yöntemi, bir model nesnesi oluşturur.
    // Model nesnesi, veritabanındaki bir tabloyu temsil eder. Model nesnesi, tablonun sütunlarını, kısıtlamalarını ve diğer özelliklerini tanımlar.
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false, //id null olamaz
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
  });
  
  module.exports=User;
   //User modelini veritabanına senkronize eder.
   // Force: true parametresi, tablonun zaten var olup olmadığına bakılmaksızın silinip yeniden oluşturulmasını sağlar.