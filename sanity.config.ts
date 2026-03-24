import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import {
  propertySchema,
  agentSchema,
  testimonialSchema,
  postSchema,
  siteConfigSchema,
} from './sanity/schemas'

export default defineConfig({
  name:    'noir-estate-studio',
  title:   'NOIR Estate Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [
      propertySchema,
      agentSchema,
      testimonialSchema,
      postSchema,
      siteConfigSchema,
    ],
  },
})
