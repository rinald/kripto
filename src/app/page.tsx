import Link from 'next/link'

import { Asset } from './coin/[id]/types'

const COINCAP_API_URL = 'https://api.coincap.io/v2'

export default async function Home() {
  const coins: { data: Asset[] } = await fetch(
    `${COINCAP_API_URL}/assets?limit=2000`
  ).then(res => res.json())

  return (
    <main style={{ marginLeft: 20 }}>
      <ul>
        {coins.data.map(coin => (
          <li key={coin.id}>
            <Link href={`/coin/${coin.id}`}>{coin.id}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
