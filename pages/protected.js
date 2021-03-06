import { useEffect } from "react"
import fetch from 'isomorphic-unfetch'
import { useSession, getSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'

export default ({ character }) => {
  const [ session, loading ] = useSession()

  if (!session) { return <AccessDenied/> }

  useEffect(() => {
    localStorage.setItem('character', JSON.stringify(character))
  }, [])

  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>This page is protected using server side protection, you must be signed in to access it.</p>
      <p>You can view this page because you are signed in.</p>

    </Layout>
  )
}

export async function getServerSideProps(context) {

  // If you need to make calls to a service (e.g. an API or database) to make
  // data avalible only to authenticated users, you can do that here by checking
  // the session object is not null or by accessing the contents of session.user
  const session = await getSession(context)
  let character

  // TODO: Remove hardcoded name on fetch! 
  try {
    const response = await fetch('http://localhost:3000/api/get-character', {method: "POST", body: JSON.stringify({"name": 'theflyingdev'})})

    const res = await response.json()

    if (res.status === 200) {
      character = JSON.stringify(res)
    }
  } 
  catch (error) {
    console.log(error)

    character = JSON.stringify(error)
  }

  return {
    props: { session, character }
  }
}
