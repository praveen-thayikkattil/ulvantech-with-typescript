export async function useGetFormData() {
    const data = await fetch('https://ulventech-react-exam.netlify.app/api/form');
    return await data.json();
}