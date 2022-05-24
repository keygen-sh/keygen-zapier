import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/license.json'

interface InputData {
  id: string
  policyId: string
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const res = await z.request({
    method: 'PUT',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/licenses/${encodeURIComponent(bundle.inputData.id)}/policy`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
      'keygen-version': '1.0',
    },
    json: {
      data: { type: 'policies', id: bundle.inputData.policyId },
    },
  })

  res.throwForStatus()

  return res.json
}

export default {
  key: 'transferLicense',
  noun: 'License',
  display: {
    label: 'Transfer License',
    description: 'Transfer an existing license to a different policy.',
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'id',
        label: 'License',
        dynamic: 'licenses.id.name',
      },
      {
        required: true,
        key: 'policyId',
        label: 'Policy',
        helpText: `The compatible policy that the license will be transferred to.`,
        dynamic: 'policies.id.name',
      },
    ],
    perform,
    sample,
  },
}
