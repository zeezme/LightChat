const { DataTypes } = require('sequelize')

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(
        'companies',
        {
          id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          role: {
            type: DataTypes.STRING,
            allowNull: true
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
          }
        },
        { transaction }
      )

      await queryInterface.createTable(
        'accounts',
        {
          id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          authId: {
            type: DataTypes.STRING,
            allowNull: false
          },
          role: {
            type: DataTypes.STRING,
            allowNull: true
          },
          companyId: {
            type: DataTypes.UUID,
            references: {
              model: 'companies',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
          }
        },
        { transaction }
      )

      await queryInterface.createTable(
        'persons',
        {
          id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          accountId: {
            type: DataTypes.UUID,
            references: {
              model: 'accounts',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
          }
        },
        { transaction }
      )

      await queryInterface.createTable(
        'logs',
        {
          id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          action: {
            type: DataTypes.STRING,
            allowNull: false
          },
          accountId: {
            type: DataTypes.UUID,
            references: {
              model: 'accounts',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          },
          entity: {
            type: DataTypes.STRING,
            allowNull: false
          },
          entityId: {
            type: DataTypes.STRING,
            allowNull: true
          },
          query: {
            type: DataTypes.STRING,
            allowNull: true
          },
          status: {
            type: DataTypes.STRING,
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
          }
        },
        { transaction }
      )
    })
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('logs', { transaction })
      await queryInterface.dropTable('persons', { transaction })
      await queryInterface.dropTable('accounts', { transaction })
      await queryInterface.dropTable('companies', { transaction })
    })
  }
}
