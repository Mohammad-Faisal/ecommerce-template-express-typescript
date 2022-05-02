import express from "express";
import logger from 'morgan';
import "reflect-metadata";
import {getMetadataArgsStorage, useExpressServer} from "routing-controllers";
import { CustomErrorHandler } from "./middlewares/CustomErrorHandler";
import "reflect-metadata";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import VendorController from "./server/controllers/VendorController";
import ProductController from "./server/controllers/ProductController";
import OrderController from "./server/controllers/OrderController";
import FileController from "./server/misc/FileController";
import ProductCategoryController from "./server/controllers/ProductCategoryController";
import ProductSubCategoryController from "./server/controllers/ProductSubCategoryController";
import ServiceCategoryController from "./server/controllers/ServiceCategoryController";
import ServiceSubCategoryController from "./server/controllers/ServiceSubCategoryController";
import ServiceController from "./server/controllers/ServiceController";
import ServicePackageController from "./server/controllers/ServicePackageController";
import FirebaseSyncController from "./server/controllers/FirebaseSyncController";
import UserController from "./server/controllers/UserController";
import {routingControllersToSpec} from "routing-controllers-openapi";
import * as swaggerUiExpress from 'swagger-ui-express';
import config from './config/index';
import HealthCheckController from "./server/controllers/HealthCheckController";

export default class App {


    public app: express.Application;
    public port = config.applicationPort;

    constructor() {

         this.app = express()
         this.app.use(logger('dev'));
        const firebase = require('firebase-admin');
        //const firebaseApp = admin.initializeApp();
        // var serviceAccount = require("./serviceAccountKey.json");
        //
        // firebase.initializeApp({
        //     credential: firebase.credential.cert(serviceAccount),
        //     databaseURL: "https://test-23cfc.firebaseio.com"
        // });

        const routingControllersOptions = {
            routePrefix: "/api/v1",
            defaultErrorHandler: false,
            classTransformer: true ,
            cors:true,
            validation : {skipMissingProperties : true},
            // validation : true,
            controllers: [HealthCheckController, UserController, ProductCategoryController , ProductSubCategoryController, ProductController ,
                ServiceCategoryController , ServiceSubCategoryController, ServiceController , ServicePackageController ,
                VendorController , OrderController , FileController , FirebaseSyncController ] ,
            middlewares: [  CustomErrorHandler  ],
            // controllers: [join(__dirname, "/server/controllers/*.controller.js")],
            // middlewareDirs: [__dirname + "/middleware/**/*.middleware.js"],
            // interceptorDirs: [__dirname + "/interceptor/**/*.interceptor.js"]
        }



        const schemas = validationMetadatasToSchemas({
            refPointerPrefix: '#/components/schemas/'
        })

// Parse routing-controllers classes into OpenAPI spec:
        const storage = getMetadataArgsStorage()
        const spec = routingControllersToSpec(storage, routingControllersOptions, {
            components: {
                schemas,
                securitySchemes: {
                    basicAuth: {
                        scheme: 'basic',
                        type: 'http'
                    }
                }
            },
            info: {
                description: 'Generated with `routing-controllers-openapi`',
                title: 'Rokkhi Products Services API',
                version: '1.0.0'
            }
        })

        useExpressServer(this.app, routingControllersOptions);

        this.app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));


        this.app.get('/', (_req, res) => {
            res.json(spec)
        })


    }


    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

}


