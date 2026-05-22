import { useCallback, useMemo } from 'react'
import { set, unset, useFormValue, type StringInputProps } from 'sanity'
import { Stack, Text, Card, Code, Button, Flex } from '@sanity/ui'

export function StructuredDataInput(props: StringInputProps) {
  const { onChange, value, path } = props

  // Get the parent path (the seo object path)
  const parentPath = path.slice(0, -1)

  // Read sibling SEO field values using parent path
  const metaTitle = useFormValue([...parentPath, 'metaTitle']) as string | undefined
  const metaDescription = useFormValue([...parentPath, 'metaDescription']) as string | undefined
  const metaAuthor = useFormValue([...parentPath, 'metaAuthor']) as string | undefined
  const metaImage = useFormValue([...parentPath, 'metaImage']) as { asset?: { _ref?: string } } | undefined
  const canonicalURL = useFormValue([...parentPath, 'canonicalURL']) as string | undefined

  // Generate structured data JSON-LD from SEO fields
  const generatedData = useMemo(() => {
    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
    }

    if (metaTitle) data.name = metaTitle
    if (metaDescription) data.description = metaDescription
    if (canonicalURL) data.url = canonicalURL

    if (metaAuthor) {
      data.author = {
        '@type': 'Person',
        name: metaAuthor,
      }
    }

    if (metaImage?.asset?._ref) {
      // Note: The actual image URL will need to be resolved at query time
      data.image = `[Image: ${metaImage.asset._ref}]`
    }

    return JSON.stringify(data, null, 2)
  }, [metaTitle, metaDescription, metaAuthor, metaImage, canonicalURL])

  const handleGenerate = useCallback(() => {
    onChange(generatedData ? set(generatedData) : unset())
  }, [onChange, generatedData])

  // Check if current value differs from generated
  const isDifferent = value !== generatedData

  return (
    <Stack space={3}>
      <Card padding={3} radius={2} tone="primary" border>
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Auto-generated from SEO fields:
          </Text>
          <Code language="json" size={1}>
            {generatedData}
          </Code>
          <Flex>
            <Button
              text={value ? 'Regenerate' : 'Use Generated Data'}
              tone="primary"
              onClick={handleGenerate}
              disabled={!isDifferent}
            />
          </Flex>
        </Stack>
      </Card>

      {value && (
        <Card padding={3} radius={2} tone="default" border>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Current value:
            </Text>
            <Code language="json" size={1}>
              {value}
            </Code>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}
