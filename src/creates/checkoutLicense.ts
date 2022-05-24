import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/licenseFile.json'

interface InputData {
  id: string
  encrypt: boolean
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const res = await z.request({
    method: 'POST',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/licenses/${encodeURIComponent(bundle.inputData.id)}/actions/check-out`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.0',
    },
    body: JSON.stringify({
      meta: {
        encrypt: !!bundle.inputData.encrypt,
        include: [
          'entitlements',
          'group',
          'user',
        ],
      },
    }),
  })

  res.throwForStatus()

  return res.json
}

export default {
  key: 'checkoutLicense',
  noun: 'License',
  display: {
    label: 'Checkout License',
    description: 'Checks out a license file.',
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
        required: false,
        key: 'encrypt',
        label: 'Encrypted',
        helpText: `Whether or not to encrypt the license file.`,
        type: 'boolean',
      },
    ],
    perform,
    sample,
  },
}
