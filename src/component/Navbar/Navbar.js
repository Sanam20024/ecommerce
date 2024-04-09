import styles from './Navbar.module.css';
import addIcon from '../../images/add.png';
import userIcon from '../../images/user.png';
import { NavLink } from 'react-router-dom';
export const Navbar = ()=>{

    return(
        //Navbar 
        <div className={styles.navbar}>   
        {/* order list for navbar */}
        <ol className={styles.list}>

        {/* logo of the app */}
        <li className={styles.Heading}>eCommerce</li>  

        {/* using navlink to redirect to the page  on click */}
        <NavLink to='/' style={{color: 'black'}}> <li>Products</li> </NavLink>  
        <NavLink to='/AddProduct' style={{color: 'black'}}>
        <li>Add a product
            <img src={addIcon} alt='add-icon'/>
        </li>
        </NavLink>
        {/* User name and logo */}
        <li className={styles.user}>Anam
        <img src={userIcon} alt='user-icon'/>
        </li>
        </ol> 
        </div>
    )
}