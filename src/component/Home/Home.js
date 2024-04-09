
// Import required modules
import home from'./Home.module.css';
import pencil from '../../images/pencil.png';
import  trash from'../../images/delete.png'
import { useAuth } from '../../context';
const Home =()=>{
   // Destructuring values from the authentication context.
    const {product,sortHandle,editHandle,
        nameRef,priceRef,ratingRef,textareaRef,
        deleteHandle,saveHandle,cancelEdit,generateStars}=useAuth();

        // Rendering product list with edit, delete, save, and cancel options.
    return( 
        <div className={home.container}>

            {/* FOR SORTING */}
        <button className={home.sort} onClick={sortHandle}>sort by price</button>   

        {/* Start looping over the array */}
           { product.map(item=>(
            <div className={home.product_container}>

                {/* Show product image */}
               <div key={item.id} className={home.image_container}>
                     <img src={item.image} alt='Product' />
                        <div className={home.product_detail}>
              {/*  Show product price and name*/}
                <div className={home.name_price}>
                  <span>  {item.isDisable ?(<input type='tex' value={item.name} disabled />):(<input type='text'  ref={nameRef} className={home.enable}/>)}</span>
                    {item.isDisable ?(<input type='text' value={`Rs. ${item.price}`} disabled/>):(<input type='number' ref={priceRef} className={home.enable} placeholder={item.price}/>)}
            </div>

            {/* Show product rating */}
            {item.isDisable ? (

    <div className={home.rating}>  
        {generateStars(item.starRating)}
        
    </div>
) : (
    <div className={home.rating} >
        <input type='number' ref={ratingRef} placeholder={item.starRating} />
    </div>
)}
            </div>
            </div>
            {/* Show product Description */}
            <div className={home.info_container}>
                <div className={home.textarea}> 
                {item.isDisable ?
                (<textarea cols='40' rows='8' disabled>{item.description}</textarea>)
                :
                (<textarea cols='40' rows='8' className={home.enable_textarea} ref={textareaRef}>{item.description}</textarea>)}</div>

                {item.isDisable?
                (
               <div className={home.img}> 
               {/* Edit pencil for edit the name,price,rating and description */}
              <button onClick={()=>editHandle(item.id)}><img src={pencil} alt='edit'/></button> 
              {/* delete the product */}
              <button onClick={()=>deleteHandle(item.id)}><img src={trash} alt='delete' /></button>  
               </div>)
               :(
                <div className={home.save_cancel_button}>
                    {/*  Save button after editing */}
                <button onClick={()=>saveHandle(item.id)}>Save</button>
                {/* Cancel edit  */}
                <button onClick={()=>cancelEdit(item.id)}>Cancel</button>
                </div>
               )}
               
            </div>
            </div>
           ))}
     
       
        </div>
        
       
        
    )
               }
export  default Home; //Export home