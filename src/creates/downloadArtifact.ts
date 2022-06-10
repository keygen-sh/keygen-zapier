import { Bundle, ZObject } from 'zapier-platform-core'

interface InputData {
  releaseId: string
  id: string
}

export function stashArtifact(z: ZObject, bundle: Bundle<{ url: string }>): string {
  const req = z.request({ url: bundle.inputData.url, raw: true })

  return z.stashFile(req)
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/releases/${encodeURIComponent(bundle.inputData.releaseId)}/artifacts/${encodeURIComponent(bundle.inputData.id)}?ttl=3600`,
    redirect: 'manual',
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.1',
    },
  })

  const url = z.dehydrateFile(stashArtifact, { url: res.getHeader('location')! })

  return { url }
}

export default {
  key: 'downloadArtifact',
  noun: 'Download',
  display: {
    label: 'Download Artifact',
    description: 'Creates a download link for a release artifact.',
    directions: 'Use this to e.g. deliver download links to your customers after purchase.'
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'releaseId',
        label: 'Release',
        helpText: `The release that the download link is for.`,
        dynamic: 'releases.id.name',
      },
      {
        required: true,
        key: 'id',
        label: 'Artifact',
        helpText: `The artifact that the download link is for.`,
        dynamic: 'artifacts.id.name',
      },
    ],
    perform,
    sample: {
      url: 'https://zapier-dev-files.s3.amazonaws.com/cli-platform/74bc623c-d94d-4cac-81f1-f71d7d517bc7'
    }
  },
}
