import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/token.json'

interface InputData {
  licenseId: string
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const res = await z.request({
    method: 'POST',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/licenses/${bundle.inputData.licenseId}/tokens`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
    },
  })

  res.throwForStatus()

  return res.json
}

export default {
  key: 'createToken',
  noun: 'Token',
  display: {
    important: true,
    label: 'Create Token',
    description: 'Creates a new API token for a license.',
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'licenseId',
        label: 'License',
        helpText: `The license that the activation token is for.`,
        dynamic: 'licenses.id.name',
      },
    ],
    perform,
    sample,
  },
}
