import { z } from 'zod';

export const FormSchema = z.object({
  category: z.string().nonempty(),
  type: z.string().optional(),
  bhk: z.string().optional(),
  bathrooms: z.string().optional(),
  furnishing: z.string().optional(),
  price: z.string().nonempty('Required'),
  photos: z.array(z.any()).min(1, 'At least 1 photo'),
  state: z.string().nonempty('Required'),
});
