import { Helmet } from 'react-helmet-async'

export default function JsonLd({ data }) {
  const schemas = Array.isArray(data) ? data : [data]
  return (
    <>
      {schemas.map((schema, i) => (
        <Helmet key={i}>
          <script type="application/ld+json">{JSON.stringify(schema, null, 0)}</script>
        </Helmet>
      ))}
    </>
  )
}
