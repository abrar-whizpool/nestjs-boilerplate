import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const CountrySchema = z.object({
    name: z.string().min(5).toLowerCase().describe('This is an name')
});

export type CountryType = z.infer<typeof CountrySchema>;

export class CreateCountryDto extends createZodDto(CountrySchema) { }

