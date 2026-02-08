import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/projects" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        image: z.string().optional(),
        tags: z.array(z.string()),
    }),
});

export const collections = {
    'projects': projectsCollection,
};