import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/user.json'

interface User {
  type: string
  id: string
  attributes: {
    email: string
  }
}

async function perform(z: ZObject, bundle: Bundle) {
  const page = bundle.meta.page || 1
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/users?page[number]=${page}&page[size]=100`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.0',
    },
  })

  return res.json.data.map(
    (u: User) => ({ id: u.id, name: u.attributes.email })
  )
}

export default {
  key: 'users',
  noun: 'Users',
  display: {
    label: 'List of Users',
    description: 'This is a hidden trigger, and is used in a Dynamic Dropdown within this app.',
    hidden: true,
  },
  operation: {
    canPaginate: true,
    sample: {
      id: sample.data.id,
      name: sample.data.attributes.email,
    },
    perform,
  },
}
