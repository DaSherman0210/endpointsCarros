import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition:{
        openapi: '3.0.0',
        info:{
            title: "AUTOMOBILES ENDPOINTS",
            version: "3.0.0",
            description: "Here is the documentation to this endpoints of this project."
        }
    },
    apis:[
        './src/routes/auth.routes.js',
        './src/routes/main.routes.js'
    ]
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;