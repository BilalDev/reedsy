import express, { NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser";

import * as apiController from "./controllers/api";

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/export', apiController.postExport);
app.post('/api/import', apiController.postImport);
app.get('/api/export', apiController.listExports);
app.get('/api/import', apiController.postImport);