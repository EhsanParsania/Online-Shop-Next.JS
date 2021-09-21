import axios from 'utils/axios'

export const getCategorizedProducts = async (categories, limit) => {
    const categorizedProducts = []
    for (const category of categories) {
        if (category.isShowHome) {
            const res = await axios.get(encodeURI(`/products?categories_like=${category.name}&_limit=${limit}`))
            categorizedProducts.push({ name: category.name, slug: category.slug, data: res.data })
        }
    }

    return categorizedProducts
}

export const getProducts = async () => {
    const res = await axios.get(`/products`)

    return res.data
}

export const getProduct = async (id) => {
    try {
        const res = await axios.get(`/products/${id}`)

        return res.data

    } catch (err) {
        // console.log('err', err)
    }
}