// Importing necessary modules and styles
import { createContext, useContext, useState, useRef, useEffect } from "react";

// Creating authentication context
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) throw new Error('Incorrect use of context');
    return value;
}

// Authentication provider component
export const AuthProvider = ({ children }) => {
    // State variables and refs for managing product data and form inputs
    const [product, setProduct] = useState([]);
    const nameRef = useRef();
    const priceRef = useRef();
    const ratingRef = useRef();
    const textareaRef = useRef();
    const nameInput = useRef();
    const descriptionInput = useRef();
    const priceInput = useRef();
    const ratingInput = useRef();
    const imageInput = useRef();

    // Fetching data from the server on component mount
    useEffect(() => {
        fetch('http://localhost:3001/product')
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.log("Error", error));
    }, []);

    // Function to handle sorting of products by price
    function sortHandle() {
        const sortPrice = [...product].sort((a, b) => a.price - b.price);
        setProduct(sortPrice);
    }

    // Function to generate stars based on rating
    const generateStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= rating ? 'yellow' : 'grey' }}>&#128970;</span>
            );
        }
        return stars;
    };

    // Function to handle editing product details
    function editHandle(id) {
        fetch(`http://localhost:3001/product/${id}`)
            .then(response => response.json())
            .then(data => {
                const index = product.findIndex((item) => item.id === id);
                if (index !== -1) {
                    const updateProduct = [...product];
                    updateProduct[index].isDisable = false;
                    setProduct(updateProduct);
                } else {
                    console.log("No Product Found");
                }
            })
            .catch(err => console.error("Error Fetching Data", err))

    }

    // Function to cancel editing and revert changes
    function cancelEdit(id) {
        fetch(`http://localhost:3001/product/${id}`)
            .then(response => response.json())
            .then(data => {
                const index = product.findIndex((item) => item.id === id);
                if (index !== -1) {
                    const updateProduct = [...product];
                    updateProduct[index].isDisable = true;
                    setProduct(updateProduct);
                } else {
                    console.log("No Product Found");
                }
            })
            .catch(err => console.error("Error Fetching Data", err))

    }

    // Function to save edited product details
    function saveHandle(id) {
        const info = {
            name: nameRef.current.value,
            description: textareaRef.current.value,
            price: priceRef.current.value,
            starRating: ratingRef.current.value,
            image: product.find(item => item.id === id).image,
            isDisable: true
        };
        console.log("Info", info);
        // Send a PUT request to update the product
        fetch(`http://localhost:3001/product/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(response => {
                if (response.ok) {
                    // If the request is successful, update the product state
                    // You can choose to re-fetch the data or update the product state directly
                    // For demonstration, let's update the product state directly
                    setProduct(prevProducts => {
                        const updatedProducts = prevProducts.map(product => {
                            if (product.id === id) {
                                // Update only the fields that are changed
                                return {
                                    ...product,
                                    name: info.name,
                                    description: info.description,
                                    price: info.price,
                                    starRating: info.starRating,
                                    image: info.image,
                                    isDisable: info.isDisable
                                };
                            }
                            return product;
                        });
                        return updatedProducts;
                    });
                } else {
                    throw new Error('Failed to update product');
                }
            })
            .catch(error => console.error('Error updating product:', error));

    }

    // Function to delete a product
    function deleteHandle(id) {

        fetch(`http://localhost:3001/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    const newProduct = product.filter(item => item.id !== id);
                    setProduct(newProduct);
                } else {
                    throw new Error('Failed to delete Product');
                }
            })
            .catch(err => console.log('Delete failed ', err));
    }

    // Function to submit a new product
    function submitHandle(e) {
        e.preventDefault();
        if (ratingInput.current.value > 5) {
            window.alert("Rating should be less than 5");
            return;
        }
        const info = {
            name: nameInput.current.value,
            description: descriptionInput.current.value,
            price: priceInput.current.value,
            starRating: ratingInput.current.value,
            isDisable: true,
            image: imageInput.current.value
        }

        fetch('http://localhost:3001/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error! status:" + response.status)
                };
                return response.json()
            })
            .then(data => {
                alert('product added successfully');
                setProduct(prevProduct => [data, ...prevProduct]);
            })
            .catch(error => {
                console.error('Error adding for adding', error);
            });
        // Clearing input fields after submission
        nameInput.current.value = '';
        descriptionInput.current.value = '';
        priceInput.current.value = '';
        ratingInput.current.value = '';
        imageInput.current.value = '';

    }

    // Providing authentication context values to children components
    return (
        <AuthContext.Provider value={{
            product,
            setProduct,
            sortHandle,
            deleteHandle,
            saveHandle,
            editHandle,
            generateStars,
            cancelEdit,
            ratingRef,
            textareaRef,
            nameRef,
            priceRef,
            nameInput,
            descriptionInput,
            priceInput,
            ratingInput,
            imageInput,
            submitHandle
        }}>
            {children}
        </AuthContext.Provider>
    )
}
