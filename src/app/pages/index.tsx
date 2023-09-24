import Layout from "../layouts/default";

export default function Home () {
  return (
    <Layout layout={{
      label: 'dada',
      navigation: []
    }}>
      <div>
        <span className="text-xl font-semibold text-gray-800">
          Home page
        </span>
      </div>
    </Layout>
  )
}
