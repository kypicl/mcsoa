import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'


export const Members: CollectionConfig = {
  slug: 'members',
  access: {
      create: () => true,
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
        options: [ 'Care Management', 'Coaching', 'Community Resource', 'Durable Medical Equipment', 'End of Life', 'Estate Planning', 'Funeral Service', 'Home Care', 'Home Safety', 'Hospice', 'Information and Referral', 'Legal & Financial', 'Medical and Medical Supplies', 'Mental Health Services', 'Moving and Organizing', 'Placement Services', 'Real Estate', 'Reverse Mortgage', 'Senior Living Communities', 'Wellness and Fitness' ]
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
