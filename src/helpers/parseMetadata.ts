import isEmpty from './isEmpty'

export function parseMetadata(obj: object | undefined): Record<string, any> | undefined {
  if (obj === undefined || isEmpty(obj)) {
    return undefined
  }

  const metadata: Record<string, any> = obj

  // Zapier dicts are string values. To allow integers and floats, we'll attempt
  // to parse metadata values as JSON.
  for (const [key, value] of Object.entries(metadata)) {
    try {
      metadata[key] = JSON.parse(value)
    } catch {
      // Leave as string if parsing fails
    }
  }

  return metadata
}

export default parseMetadata
