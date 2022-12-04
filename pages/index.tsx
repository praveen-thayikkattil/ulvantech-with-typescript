import { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import Form, { FormData } from '../components/Form';
import { useGetFormData } from '../hooks/use-get-form-data';

function IndexPage() {
  const [formData, setFormData] = useState<FormData[]>();

  useEffect(() => {
    useGetFormData()
      .then(items => {
        setFormData(items)
      })
  }, [])
  
  return (
    <Layout title="UlvanTech | ReactJS Test">
      <Form title='Ulvantech React Test - Form' formData={formData} />
    </Layout>
  );
}

export default IndexPage
