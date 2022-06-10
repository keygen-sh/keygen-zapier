import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/artifact.json'

interface InputData {
  releaseId: string
  id: string
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  if (!bundle.inputData.releaseId || !bundle.inputData.id) {
    return [];
  }

  const res = await z.request({
    skipThrowForStatus: true,
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/releases/${encodeURIComponent(bundle.inputData.releaseId)}/artifacts/${encodeURIComponent(bundle.inputData.id)}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.1',
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
  key: 'artifact',
  noun: 'Artifact',
  display: {
    label: 'Find Artifact',
    description: 'Finds an existing release artifact by its filename or Keygen ID.',
  },
  operation: {
    inputFields: [
      {
        required: false,
        key: 'releaseId',
        label: 'Release',
        dynamic: 'releases.id.name',
      },
      {
        required: false,
        key: 'id',
        label: 'Artifact',
        dynamic: 'artifacts.id.name',
      },
    ],
    perform,
    sample,
  },
}
