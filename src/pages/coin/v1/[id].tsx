const COINCAP_API_URL = 'https://api.coincap.io/v2'

import type { Asset } from '@/app/coin/[id]/types'

// @ts-ignore
const coins: { data: Asset[] } = await fetch(
  `${COINCAP_API_URL}/assets?limit=2000`
).then(res => res.json())

export const getStaticPaths = async () => {
  return {
    paths: coins.data
      .filter(coin => !!coin.id)
      .map(coin => ({ params: { id: coin.id } })),
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({
  params,
}: {
  params: { id: string }
}) => {
  const coin = coins.data.find(coin => coin.id === params.id)

  return {
    props: {
      coin,
    },
  }
}

const Page = ({ coin }: { coin: Asset }) => {
  if (!coin) {
    return <div>Not found!</div>
  }

  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <table>
        <tbody>
          {Object.entries(coin).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Page
