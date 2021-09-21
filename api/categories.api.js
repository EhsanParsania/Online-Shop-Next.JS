import axios from 'utils/axios'

export const getCategories = async () => {
    const res = await axios.get('/categories')
    
    return res.data
}