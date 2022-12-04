export async function useUpdateFormData(data={}) {
    const response = await fetch('https://ulventech-react-exam.netlify.app/api/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json();
}