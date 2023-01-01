import * as z from 'zod';

export const ParamsWithSearchValue = z.object({
	search: z.string().min(1),
});

export type ParamsWithSearchValue = z.infer<typeof ParamsWithSearchValue>;
