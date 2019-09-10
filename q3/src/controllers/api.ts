import { Response, Request, NextFunction } from "express";
import * as Joi from "joi";
import * as fs from "fs";
import * as path from "path";

import { ExportReq } from "../schemas";
import { ExportJob, State } from "../models";

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
        const data = fs.readFileSync(path.join(__dirname, '../../../__mocks__/export.json'), 'utf-8');
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

        fs.writeFile(path.join(__dirname, '../../../__mocks__/export.json'), results, (err) => {
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
    fs.readFile(path.join(__dirname, '../../../../__mocks__/export.json'), 'utf-8', (err, data) => {
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
export const postImport = (req: Request, res: Response, next: NextFunction) => {};

/**
 * GET /api/import
 * list import job by state
 *
 * @param req
 * @param res
 * @param next
 */
export const listImports = (req: Request, res: Response, next: NextFunction) => {};
