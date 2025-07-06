import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://products-api-20yl.onrender.com";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// GET
export async function getData(endpoint) {
    const res = await api.get(endpoint);
    return res.data;
}

// POST
export async function postData(endpoint, data) {
    const res = await api.post(endpoint, data);
    return res.data;
}

// PUT
export async function putData(endpoint, data) {
    const res = await api.put(endpoint, data);
    return res.data;
}

// DELETE
export async function deleteData(endpoint) {
    const res = await api.delete(endpoint);
    return res.data;
}
