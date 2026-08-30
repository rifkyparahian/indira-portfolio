import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ============ KOLEKSI: Kartu Design (Puzzle 12) ============
const designs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/designs' }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    alt: z.string().default(''),
    image: z.string(),
    cardBg: z.string().default('bg-[#FFF8E7]'),
    badgeBg: z.string().default('bg-pink-100'),
  }),
});

// ============ KOLEKSI: Foto Look (Compcard & Lookbook) ============
const looks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/looks' }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    alt: z.string().default(''),
    image: z.string(),
    labelClass: z.string().default('text-gray-900'),
    badgeBg: z.string().default('bg-yellow-200'),
    rotate: z.string().default('rotate-0'),
    position: z.string().default('top-12 left-8'),
    zClass: z.string().default('z-10'),
  }),
});

// ============ KOLEKSI: Pengaturan Website ============
const settings = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content/settings' }),
  schema: z.object({
    siteTitle: z.string(),
    hero: z.object({
      greeting: z.string(),
      headline: z.string(),
      highlight: z.string(),
      tagline: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
    }),
    marquee: z.array(z.string()),
    stats: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    contact: z.object({
      email: z.string(),
      instagram: z.string(),
      footer: z.string(),
    }),
  }),
});

export const collections = { designs, looks, settings };
