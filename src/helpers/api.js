// get all products
export const getAllProducts = async () => {
  const response = await fetch("http://localhost:5000/api/products");

  if (!response.ok) {
    throw new Error("Get products failed");
  }

  const data = await response.json();

  console.log(data);

  return data.products;
};

//get product by id
export const getProductById = async (productId) => {
  const response = await fetch(
    "http://localhost:5000/api/products/" + productId
  );

  if (!response.ok) {
    throw new Error("Get product failed");
  }

  const data = await response.json();

  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Login user failed");
  }

  const data = await response.json();

  return data;
};
