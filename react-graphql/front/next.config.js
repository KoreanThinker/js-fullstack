require("dotenv").config()

module.exports = {
    env: {
        GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
    },
}