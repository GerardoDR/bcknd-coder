const knexSqLite = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './DB/ecommerce.sqlite'
    },
    pool: {min: 0, max: 10},
    useNullAsDefault: true
})

module.exports = { knexSqLite };