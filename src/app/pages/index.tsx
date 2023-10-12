import Layout from "../layouts/standard";

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
