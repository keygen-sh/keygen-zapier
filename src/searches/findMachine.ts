import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/machine.json'

interface InputData {
  id: string
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  if (!bundle.inputData.id) {
    return [];
  }

  const res = await z.request({
    skipThrowForStatus: true,
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/machines/${encodeURIComponent(bundle.inputData.id)}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.4',
    },
  })

  // We don't want to throw an error on 404s
  if (res.status === 404) {
    return []
  }

  res.throwForStatus()

  return [res.json]
}

export default {
  key: 'machine',
  noun: 'Machine',
  display: {
    label: 'Find Machine',
    description: 'Finds an existing machine by its machine fingerprint or Keygen ID.',
    important: true,
  },
  operation: {
    inputFields: [
      {
        required: false,
        key: 'id',
        label: 'Machine',
        dynamic: 'machines.id.name',
      },
    ],
    perform,
    sample,
  },
}
