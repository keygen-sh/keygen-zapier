import { Bundle, ZObject } from 'zapier-platform-core'
import parseMetadata from '../helpers/parseMetadata'
import * as sample from '../samples/user.json'

interface InputData {
  id: string
  metadata: object
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const metadata = parseMetadata(bundle.inputData.metadata)

  const res = await z.request({
    method: 'PATCH',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/users/${encodeURIComponent(bundle.inputData.id)}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
      'keygen-version': '1.4',
    },
    json: {
      data: {
        type: 'users',
        attributes: {
          metadata,
        },
      },
    },
  })

  return res.json
}

export default {
  key: 'updateUser',
  noun: 'User',
  display: {
    label: 'Update User',
    description: 'Updates a user.',
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'id',
        label: 'User',
        dynamic: 'users.id.name',
      },
      {
        required: false,
        key: 'metadata',
        label: 'Metadata',
        helpText: `Metadata is useful for storing additional, structured information on a user. As an example, you could store a user's license ID for quick lookup or a Stripe customer ID. Values are parsed as JSON, e.g. 1.3 is a float, true is a boolean, and foo is a string. Wrap in double quotes to force a string, e.g. "1".`,
        dict: true,
      },
    ],
    perform,
    sample,
  },
}
