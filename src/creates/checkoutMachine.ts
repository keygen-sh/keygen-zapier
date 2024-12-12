import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/machineFile.json'

interface InputData {
  id: string
  encrypt: boolean
  ttl: number
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const ttl = bundle.inputData.ttl === -1 ? null : (bundle.inputData.ttl != null ? bundle.inputData.ttl : undefined)
  const res = await z.request({
    method: 'POST',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/machines/${encodeURIComponent(bundle.inputData.id)}/actions/check-out`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.4',
    },
    body: JSON.stringify({
      meta: {
        encrypt: !!bundle.inputData.encrypt,
        ttl,
        include: [
          'license.entitlements',
          'license.user',
          'license',
          'group',
        ],
      },
    }),
  })

  return res.json
}

export default {
  key: 'checkoutMachine',
  noun: 'Machine',
  display: {
    label: 'Checkout Machine',
    description: 'Checks out a machine file.',
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'id',
        label: 'Machine',
        dynamic: 'machines.id.name',
      },
      {
        required: false,
        key: 'ttl',
        label: 'Time-to-live',
        helpText: `An optional time-to-live for the machine file, in seconds. When blank, this will be automatically set according to the Policy.`,
        type: 'integer',
      },
      {
        required: false,
        key: 'encrypt',
        label: 'Encrypted',
        helpText: `Whether or not to encrypt the machine file.`,
        type: 'boolean',
      },
    ],
    perform,
    sample,
  },
}
