import { Response, Request, NextFunction } from "express";
import * as Joi from "joi";
import * as fs from "fs";
import * as path from "path";

import { ExportReq, ImportReq } from "../schemas";
import { ExportJob, ImportJob, State } from "../models";

const mockExport = path.join(__dirname, '../../../__mocks__/export.json');
const mockImport = path.join(__dirname, '../../../__mocks__/import.json');

/**
 * POST /api/export
 * post new export job
 *
 * @param req
 * @param res
 * @param next
 */
export const postExport = (req: Request, res: Response, next: NextFunction) => {
    Joi.validate(req.body, ExportReq, (err) => {
        if (err) {
            res.status(422).send({ message: err });

            return next();
        }

        const { bookId, type, url } = req.body;

        const data = fs.readFileSync(mockExport, 'utf-8');
        let exports = JSON.parse(data) as Array<any>;
        let exportJob = null;
        let foundExp = exports.find(exp => {return (exp.bookId === bookId)});

        // export job already exists, update it
        if (typeof foundExp !== 'undefined') {
            exportJob = foundExp as ExportJob;
            exportJob = ExportJob.update(exportJob);
            exports = exports.filter(exp => { return (exp.bookId !== bookId)});
        }
        else {
            exportJob = new ExportJob(bookId, type, url);
        }

        exports.push(exportJob);
        let results = JSON.stringify(exports, null, 4);

        fs.writeFile(mockExport, results, (err) => {
            if (err) {
                res.status(500).send({ message: err });

                return next();
            }

            res.status(200).send({ message: "Export job."});
        });
    });
};

/**
 * GET /api/export
 * list export job by state
 *
 * @param req
 * @param res
 * @param next
 */
export const listExports = (req: Request, res: Response, next: NextFunction) => {
    fs.readFile(mockExport, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send({ message: err });

            return next();
        }
        try {
            let exports = JSON.parse(data) as Array<any>;

            let pendings = exports.filter(exp => {
                return (exp.state === State.pending);
            });
            let finished = exports.filter(exp => {
                return (exp.state === State.finished);
            });

            res.status(200).send({ pendings: pendings, finished: finished });

            return next();
        }
        catch (exception) {
            res.status(500).send({ message: exception.message });

            return next();
        }
    });
};

/**
 * POST /api/import
 * post new import job
 *
 * @param req
 * @param res
 * @param next
 */
export const postImport = (req: Request, res: Response, next: NextFunction) => {
    Joi.validate(req.body, ImportReq, (err) => {
        if (err) {
            res.status(422).send({ message: err });

            return next();
        }

        const { bookId, type } = req.body;

        const data = fs.readFileSync(mockImport, 'utf-8');
        let imports = JSON.parse(data) as Array<any>;
        let importJob = null;
        let foundImp = imports.find(imp => {return (imp.bookId === bookId)});

        if (typeof foundImp !== 'undefined') {
            importJob =  foundImp as ImportJob;
            importJob = ImportJob.update(importJob);
            imports = imports.filter(imp => {
                return (imp.bookId !== bookId);
            });
        }
        else {
            importJob = new ImportJob(bookId, type);
        }

        imports.push(importJob);
        let results = JSON.stringify(imports, null, 4);

        fs.writeFile(mockImport, results, (err) => {
            if (err) {
                res.status(500).send({ message: err });

                return next();
            }

            res.status(200).send({message: "Import job."});
        });
    });
};

/**
 * GET /api/import
 * list import job by state
 *
 * @param req
 * @param res
 * @param next
 */
export const listImports = (req: Request, res: Response, next: NextFunction) => {
    fs.readFile(mockImport, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send({ message: err });

            return next();
        }
        try {
            let imports = JSON.parse(data) as Array<any>;
            let returns = {pendings: {}, finished: {}};

            let pendings = imports.filter(exp => {
                return (exp.state === State.pending);
            });
            let finished = imports.filter(exp => {
                return (exp.state === State.finished);
            });

            returns.pendings = pendings;
            returns.finished = finished;

            res.status(200).send(returns);

            return next();

        }
        catch (exception) {
            res.status(500).send({ message: exception.message });

            return next();
        }
    });
};
