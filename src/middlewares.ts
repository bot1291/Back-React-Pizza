// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import { ZodError } from 'zod';
import ErrorResponse from './interfaces/ErrorResponse';
import RequestValidators from './interfaces/RequestValidators';

export function notFound(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	res.status(404);
	const error = new Error(`Path ${req.originalUrl} not found`);
	next(error);
}

export function errorHandler(
	err: Error,
	_req: Request,
	res: Response<ErrorResponse>
): void {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack:
			process.env.NODE_ENV === 'production' ? 'error stack' : err.stack,
	});
}

export const validateRequest = (validators: RequestValidators) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			if (validators.query) {
				req.query = await validators.query.parseAsync(req.query);
			}
			if (validators.params) {
				req.params = await validators.params.parseAsync(req.params);
			}
			if (validators.body) {
				req.body = await validators.body.parseAsync(req.body);
			}
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(422);
			}
			next(error);
		}
	};
};
