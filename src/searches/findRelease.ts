import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/release.json'

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
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/releases/${encodeURIComponent(bundle.inputData.id)}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.0',
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
  key: 'release',
  noun: 'Release',
  display: {
    label: 'Find Release',
    description: 'Finds an existing release by its Keygen ID.',
  },
  operation: {
    inputFields: [
      {
        required: false,
        key: 'id',
        label: 'Release',
        dynamic: 'releases.id.name',
      },
    ],
    perform,
    sample,
  },
}
