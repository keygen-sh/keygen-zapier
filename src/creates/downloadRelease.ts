import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/release.json'

interface InputData {
  id: string
}

function stashRelease(z: ZObject, bundle: Bundle<{ url: string }>): string {
  const req = z.request({ url: bundle.inputData.url, raw: true })

  return z.stashFile(req)
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/releases/${bundle.inputData.id}/artifact?ttl=3600`,
    redirect: 'manual',
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
    },
  })

  res.throwForStatus()

  const url = z.dehydrateFile(stashRelease, { url: res.headers.location })

  return { url }
}

export default {
  key: 'downloadRelease',
  noun: 'Release',
  display: {
    important: true,
    label: 'Download Release',
    description: 'Creates a download link for a release.',
    directions: 'Use this to e.g. deliver download links to your customers after purchase.'
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'id',
        label: 'Release',
        helpText: `The release that the download link is for.`,
        dynamic: 'releases.id.name',
      },
    ],
    perform,
    sample: {
      url: 'https://zapier-dev-files.s3.amazonaws.com/cli-platform/74bc623c-d94d-4cac-81f1-f71d7d517bc7'
    }
  },
}
