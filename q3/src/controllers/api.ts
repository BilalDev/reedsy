import { Response, Request, NextFunction } from "express";
import * as Joi from "joi";
import * as fs from "fs";
import * as path from "path";

/**
 * POST /api/export
 * post new export job
 *
 * @param req
 * @param res
 * @param next
 */
export const postExport = (req: Request, res: Response, next: NextFunction) => {};

/**
 * GET /api/export
 * list export job by state
 *
 * @param req
 * @param res
 * @param next
 */
export const listExports = (req: Request, res: Response, next: NextFunction) => {};

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
