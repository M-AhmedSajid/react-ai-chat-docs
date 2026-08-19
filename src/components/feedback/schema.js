import { z } from 'zod/mini';

export const blockFeedback = z.object({
  /** full URL of page where fired */
  url: z.string(),
  blockId: z.string(),
  message: z.string(),

  /** the referenced text of block */
  blockBody: z.string(),
});

export const pageFeedback = z.object({
  opinion: z.enum(['good', 'bad']),
  /** full URL of page where fired */
  url: z.string(),
  message: z.string(),
});

export const actionResponse = z.object({
  githubUrl: z.optional(z.string()),
});
