import { Bundle, ZObject } from 'zapier-platform-core'
import parseMetadata from '../helpers/parseMetadata'
import * as sample from '../samples/machine.json'

interface InputData {
  id: string
  name: string
  metadata: object
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const metadata = parseMetadata(bundle.inputData.metadata)

  const res = await z.request({
    method: 'PATCH',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/machines/${encodeURIComponent(bundle.inputData.id)}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
      'keygen-version': '1.4',
    },
    json: {
      data: {
        type: 'licenses',
        attributes: {
          name: bundle.inputData.name ?? undefined,
          metadata,
        },
      },
    },
  })

  return res.json
}

export default {
  key: 'updateMachine',
  noun: 'Machine',
  display: {
    label: 'Update Machine',
    description: 'Updates a machine.',
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
        key: 'name',
        label: 'Name',
        helpText: `An optional name for the machine. This can be used to quickly identify machines.`,
        type: 'string',
      },
      {
        required: false,
        key: 'metadata',
        label: 'Metadata',
        helpText: `Metadata is useful for storing additional, structured information on a machine. As an example, you could store a customer's email address or even hardware IDs. Values are parsed as JSON, e.g. 1.3 is a float, true is a boolean, and foo is a string. Wrap in double quotes to force a string, e.g. "1".`,
        dict: true,
      },
    ],
    perform,
    sample,
  },
}
