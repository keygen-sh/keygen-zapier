import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/release.json'

interface Release {
  type: string
  id: string
  attributes: {
    channel: string
    version: string
    name: string
  }
}

function toLabel(release: Release): string {
  const { name, version, channel } = release.attributes

  return `${name} v${version} (${channel})`.trim()
}

async function perform(z: ZObject, bundle: Bundle) {
  const page = bundle.meta.page || 1
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/releases?page[number]=${page}&page[size]=100`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.4',
    },
  })

  return res.json.data.map(
    (r: Release) => ({ id: r.id, name: toLabel(r) })
  )
}

export default {
  key: 'releases',
  noun: 'Releases',
  display: {
    label: 'List of Releases',
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
