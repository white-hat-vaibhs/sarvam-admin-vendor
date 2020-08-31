import { API } from "../../../helpers/backend";

const getToken = () => {
  return JSON.parse(window.localStorage.getItem("jwt")).token || undefined;
};

//category calls
export const createCategory = (category) => {
  return fetch(`${API}/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: category,
  }).then((response) => {
    console.log(response);
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  });
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

export const updateCategory = (cat_id, category) => {
  console.log(category);
  return fetch(`${API}/categories/${cat_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: category
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

// delete cat
export const deleteCategory = (categoryId) => {
  return fetch(`${API}/categories/${categoryId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

// ? SUb category

export const createSubCategory = (subcategory) => {
  return fetch(`${API}/subcategories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: subcategory,
  })
  .then((response) => response.json())
  .catch((err) => err)
};

//get single category
export const getSubCategory = (categoryId) => {
  return fetch(`${API}/subcategories/${categoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

//get all categories
export const getSubCategoriesByParentCategoryId = (pid) => {
  return fetch(`${API}/subcategories/parentcategory/${pid}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

// update cat

export const updateSubCategory = (categoryId, category) => {
  return fetch(`${API}/subcategories/${categoryId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: category,
  })
    .then((response) => response.json())
    .catch((err) => err);
};

// delete cat
export const deleteSubCategory = (categoryId) => {
  return fetch(`${API}/subcategories/${categoryId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

export const getUsers = () => {
  return fetch(`${API}/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((data) => data.json())
    .catch(console.log);
};

export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response) => {
      if (response.error) throw new Error(response.error);
      return response;
    });
};

export const deleteProduct = (prodId) => {
  return fetch(`${API}/products/${prodId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response) => {
      if (response.error) throw new Error(response.error);
      return response;
    });
};


export const getServices = () => {
  return fetch(`${API}/services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response) => {
      if (response.error) throw new Error(response.error);
      return response;
    });
};


export const deleteService = (serviceId) => {
  return fetch(`${API}/services/${serviceId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then((response) => {
      if (response.error) throw new Error(response.error);
      return response;
    });
};
