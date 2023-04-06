const COINCAP_API_URL = 'https://api.coincap.io/v2'

import type { Asset } from './types'

export const generateStaticParams = async () => {
  const coins: { data: Asset[] } = await fetch(
    `${COINCAP_API_URL}/assets?limit=2000`
  ).then(res => res.json())

  return coins.data.filter(coin => !!coin.id).map(coin => ({ id: coin.id }))
}

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  const coins: { data: Asset[] } = await fetch(
    `${COINCAP_API_URL}/assets?limit=2000`,
    { next: { revalidate: 60 } }
  ).then(res => res.json())

  const coinData = coins.data.find(coin => coin.id === id)

  if (!coinData) {
    return <div>Not found!</div>
  }

  return (
    <table>
      <tbody>
        {Object.entries(coinData).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Page
