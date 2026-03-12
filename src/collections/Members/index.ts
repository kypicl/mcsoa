import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Members: CollectionConfig = {
  slug: 'members',
  access: {
      create: authenticated,
      delete: authenticated,
      read: anyone,
      update: authenticated,
    },
    admin: {
      useAsTitle: 'name',
    },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
        name: 'category',
        type: 'select',
        options: [ 'Care Management', 'Coaching', 'Durable Medical Equipment', 'End of Life', 'Estate Planning', 'Home Health Care - In Home Assistance', 'Hospice', 'Information and Referral', 'Legal', 'Medical and Medical Supplies', 'Mental Health Services', 'Moving and Organizing', 'Placement Services', 'Real Estate', 'Reverse Mortgage', 'Senior Housing', 'Wellness and Fitness' ]
    },
    {
        name: 'contact_name',
        type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
        name: 'logo',
        type: 'upload',
        relationTo: 'media',
    },
    {
        name: 'link',
        type: 'text',
        required: true,
    },
    {
        name: 'email',
        type: 'email',
        required: true,
    },
    {
        name: 'address',
        type: 'text',
    },
    {
        name: 'phone',
        type: 'text',
        required: true,
    }
  ],
}