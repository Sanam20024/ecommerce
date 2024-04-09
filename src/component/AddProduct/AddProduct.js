// Importing necessary modules and styles
import { useAuth } from '../../context';
import cart from './AddProduct.module.css';

// AddProduct component for adding a new product
export const AddProduct = () => {
    // Destructuring values from the authentication context
    const { nameInput, descriptionInput, priceInput, ratingInput, imageInput, submitHandle } = useAuth();

    // Rendering the add product form
    return (
        <div className={cart.cart_container}>
            <div className={cart.addtocard_form}>
                <h2>Add a Product</h2>
                <form>
                    {/* Input fields for product details */}
                    <label htmlFor="name">Name</label><br />
                    <input type='text' ref={nameInput} /><br />
                    <label htmlFor="description">Description</label><br />
                    <input type='text' ref={descriptionInput} /><br />
                    <label htmlFor="Product">Paste Link of the Product Image</label><br />
                    <input type='text' ref={imageInput} /><br />
                    <label htmlFor="price">Price</label><br />
                    <input type='number' ref={priceInput} /><br />
                    <label htmlFor="rating">Rating (1-5)</label><br />
                    <input type='number' ref={ratingInput} /><br />
                    {/* Button to submit the form */}
                    <button onClick={submitHandle}>Submit</button>
                </form>
            </div>
        </div>
    )
}
