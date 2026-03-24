// ─── Property Schema ──────────────────────────────────────────────────────────

export const propertySchema = {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    { name: 'title',    title: 'Title',    type: 'string', validation: (R: any) => R.required() },
    { name: 'slug',     title: 'Slug',     type: 'slug',   options: { source: 'title' }, validation: (R: any) => R.required() },
    { name: 'tagline',  title: 'Tagline',  type: 'string' },
    { name: 'isFeatured', title: 'Featured on Homepage', type: 'boolean', initialValue: false },
    { name: 'tag',      title: 'Display Tag', type: 'string', description: 'e.g. Featured, New, Off Market' },
    {
      name: 'status', title: 'Status', type: 'string',
      options: { list: ['available', 'under_offer', 'sold', 'off_market', 'new'] },
      initialValue: 'available',
    },
    {
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['penthouse', 'villa', 'estate', 'townhouse', 'apartment', 'island'] },
    },
    {
      name: 'location', title: 'Location', type: 'object',
      fields: [
        { name: 'address', title: 'Address',  type: 'string' },
        { name: 'city',    title: 'City',     type: 'string' },
        { name: 'country', title: 'Country',  type: 'string' },
        {
          name: 'coordinates', title: 'Coordinates', type: 'object',
          fields: [
            { name: 'lat', title: 'Latitude',  type: 'number' },
            { name: 'lng', title: 'Longitude', type: 'number' },
          ],
        },
      ],
    },
    { name: 'price',      title: 'Price',    type: 'number' },
    { name: 'priceLabel', title: 'Price Label (override)', type: 'string', description: 'e.g. "POA" — overrides the numeric price' },
    {
      name: 'currency', title: 'Currency', type: 'string',
      options: { list: ['USD', 'GBP', 'EUR', 'AED', 'CHF'] },
      initialValue: 'USD',
    },
    {
      name: 'specs', title: 'Property Specs', type: 'object',
      fields: [
        { name: 'bedrooms',  title: 'Bedrooms',  type: 'number' },
        { name: 'bathrooms', title: 'Bathrooms', type: 'number' },
        { name: 'sqft',      title: 'Square Footage', type: 'number' },
        { name: 'garages',   title: 'Garages',   type: 'number' },
        { name: 'pool',      title: 'Pool',      type: 'boolean' },
        { name: 'cinema',    title: 'Cinema',    type: 'boolean' },
      ],
    },
    { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'images', title: 'Gallery Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'features',  title: 'Key Features',  type: 'array', of: [{ type: 'string' }] },
    { name: 'amenities', title: 'Amenities',     type: 'array', of: [{ type: 'string' }] },
    { name: 'agent',     title: 'Listing Agent', type: 'reference', to: [{ type: 'agent' }] },
    { name: 'videoUrl',       title: 'Video URL',       type: 'url' },
    { name: 'virtualTourUrl', title: 'Virtual Tour URL', type: 'url' },
    { name: 'brochureUrl',    title: 'Brochure URL',     type: 'url' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location.city', media: 'featuredImage' },
  },
}

// ─── Agent Schema ─────────────────────────────────────────────────────────────

export const agentSchema = {
  name: 'agent',
  title: 'Agent',
  type: 'document',
  fields: [
    { name: 'name',           title: 'Full Name',       type: 'string' },
    { name: 'title',          title: 'Job Title',       type: 'string' },
    { name: 'phone',          title: 'Phone',           type: 'string' },
    { name: 'email',          title: 'Email',           type: 'string' },
    { name: 'bio',            title: 'Bio',             type: 'text'   },
    { name: 'photo',          title: 'Photo',           type: 'image', options: { hotspot: true } },
    { name: 'calcomUsername', title: 'Cal.com Username', type: 'string', description: 'For direct booking links' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
}

// ─── Testimonial Schema ───────────────────────────────────────────────────────

export const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'quote',    title: 'Quote',    type: 'text' },
    { name: 'author',   title: 'Author',   type: 'string' },
    { name: 'role',     title: 'Role',     type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'rating',   title: 'Rating',   type: 'number', initialValue: 5 },
    { name: 'photo',    title: 'Photo',    type: 'image', options: { hotspot: true } },
  ],
  preview: { select: { title: 'author', subtitle: 'role' } },
}

// ─── Blog Post Schema ─────────────────────────────────────────────────────────

export const postSchema = {
  name: 'post',
  title: 'Journal Post',
  type: 'document',
  fields: [
    { name: 'title',        title: 'Title',    type: 'string' },
    { name: 'slug',         title: 'Slug',     type: 'slug', options: { source: 'title' } },
    { name: 'excerpt',      title: 'Excerpt',  type: 'text' },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'category',     title: 'Category', type: 'string' },
    { name: 'readTime',     title: 'Read Time (minutes)', type: 'number' },
    { name: 'author',       title: 'Author',   type: 'reference', to: [{ type: 'agent' }] },
    { name: 'body',         title: 'Body',     type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'featuredImage' },
  },
}

// ─── Site Config Schema ───────────────────────────────────────────────────────

export const siteConfigSchema = {
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    { name: 'heroTitle',    title: 'Hero Title',    type: 'string' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text'   },
    { name: 'heroTagline',  title: 'Hero Tagline',  type: 'string' },
    {
      name: 'stats', title: 'Homepage Stats', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'num',   title: 'Number/Value', type: 'string' },
          { name: 'label', title: 'Label',        type: 'string' },
        ],
      }],
    },
  ],
  preview: { prepare: () => ({ title: 'Site Configuration' }) },
}
