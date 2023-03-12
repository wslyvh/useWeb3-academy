import { Button } from '@chakra-ui/react'

export default function Home() {
  return (
    <main>
      Error page
      <br />
      <Button
        type="button"
        onClick={() => {
          throw new Error('Sentry Frontend Error')
        }}>
        Throw error
      </Button>
    </main>
  )
}
