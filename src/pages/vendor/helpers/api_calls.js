import { API } from "../../../helpers/backend"
const getToken = () => {
    return JSON.parse(window.localStorage.getItem("jwt")).token || undefined;
  };
  
// get all products by vendor id
export const getProductsByVendorId = (vendor_id) => {
    return fetch(`${API}/products?vendor_id=${vendor_id}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => err);
};

export const createProduct = (product, token) => {
    return fetch(`${API}/products`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => err);
};

//delete a product

export const deleteProduct = (productId, token) => {
    return fetch(`${API}/products/${productId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

//get a product

export const getProduct = (productId) => {
    return fetch(`${API}/products/${productId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => err);
};

//update a product

export const updateProduct = (productId, product, token) => {
    return fetch(`${API}/products/${productId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => err);
};

// 

export const getVendorServices = (uid) => {
    return fetch(`${API}/services?vendor_id=${uid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },        
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => err);
};

export const getOptableSubCategoriesByVendor = () => {
    return fetch(`${API}/subcategories/vendor/all`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },        
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => err);    
}


export const createService = (service) => {
    return fetch(`${API}/services`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(service),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => err);
};

export const updateService = (id, service) => {
    return fetch(`${API}/services/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(service),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => err);
};

export const deleteService = (id) => {
    return fetch(`${API}/services/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => err);
};