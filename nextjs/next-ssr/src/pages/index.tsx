import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <span>
        <Link href="/page1">
          <a>Page 1</a>
        </Link>
      </span>
      <span>&nbsp; | &nbsp;</span>
      <span>
        <Link href="/page2">
          <a>Page 2</a>
        </Link>
      </span>
      <span>&nbsp; | &nbsp;</span>
      <span>
        <Link href="/users">
          <a>Users</a>
        </Link>
      </span>
      <h1>
        Hello World
      </h1>
    </div>
  )
}

export default Home
