import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/policy.json'

interface Policy {
  type: string
  id: string
  attributes: {
    name: string
  }
}

async function perform(z: ZObject, bundle: Bundle) {
  const page = bundle.meta.page || 1
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/policies?page[number]=${page}&page[size]=100`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.4',
    },
  })

  return res.json.data.map(
    (p: Policy) => ({ id: p.id, name: p.attributes.name })
  )
}

export default {
  key: 'policies',
  noun: 'Policies',
  display: {
    label: 'List of Policies',
    description: 'This is a hidden trigger, and is used in a Dynamic Dropdown within this app.',
    hidden: true,
  },
  operation: {
    canPaginate: true,
    sample: {
      id: sample.data.id,
      name: sample.data.attributes.name,
    },
    perform,
  },
}
