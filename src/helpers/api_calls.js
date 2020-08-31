import { API } from "../../backend";

//category calls
export const createCategory = (token, category) => {
  return fetch(`${API}/categories`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get single category
export const getCategory = (categoryId) => {
  return fetch(`${API}/categories/${categoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// update cat

export const updateCategory = (categoryId, category, token) => {
  return fetch(`${API}/categories/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// delete cat
export const deleteCategory = (categoryId, token) => {
  return fetch(`${API}/categories/${categoryId}`, {
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

//products calls

//create a product
export const createProduct = (token, product) => {
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

//get all products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
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

export const updateProduct = (productId, token, product) => {
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