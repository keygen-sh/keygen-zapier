import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/artifact.json'

interface Artifact {
  type: string
  id: string
  attributes: {
    filename: string
    platform: string
    arch: string
  }
  relationships: {
    release: {
      data: { id: string }
    }
  }
}

function toLabel(artifact: Artifact): string {
  const { release: { data: { id: releaseId } } } = artifact.relationships
  const { filename, platform, arch } = artifact.attributes

  return `${filename} - ${platform}/${arch} (${releaseId})`
}

async function perform(z: ZObject, bundle: Bundle) {
  const page = bundle.meta.page || 1
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/artifacts?page[number]=${page}&page[size]=100`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.4',
    },
  })

  return res.json.data.map(
    (a: Artifact) => ({ id: a.id, name: toLabel(a) })
  )
}

export default {
  key: 'artifacts',
  noun: 'Artifacts',
  display: {
    label: 'List of Artifacts',
    description: 'This is a hidden trigger, and is used in a Dynamic Dropdown within this app.',
    hidden: true,
  },
  operation: {
    canPaginate: true,
    sample: {
      id: sample.data.id,
      name: toLabel(sample.data),
    },
    perform,
  },
}
