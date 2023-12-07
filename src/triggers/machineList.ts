import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/machine.json'

interface Machine {
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
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/machines?page[number]=${page}&page[size]=100`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.4',
    },
  })

  return res.json.data.map(
    (l: Machine) => ({ id: l.id, name: l.attributes.name })
  )
}

export default {
  key: 'machines',
  noun: 'Machines',
  display: {
    label: 'List of Machines',
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
