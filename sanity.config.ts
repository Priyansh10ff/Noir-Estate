import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
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
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool()],
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
