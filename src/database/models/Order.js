module.exports = (sequelize, DataTypes) => {
    const alias = 'Order'
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        orderNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    const config = {
        tablename: 'orders',
        timestamps: false,
        underscored: true
    }
    const Order = sequelize.define(alias, columns, config);
    return Order;
}