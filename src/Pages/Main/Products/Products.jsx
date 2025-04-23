import React from 'react'
import "./Products.css"
import ProductCard from '../../../Components/ProductCard/ProductCard'
import { products } from '../../../data/products'
import { useLanguage } from '../../../context/LanguageContext'

const Products = () => {
  const { translate } = useLanguage();
  
  return (
    <section className="products-section" id="products">
      <div className="products-container">
        <h2 className="products-title">{translate('products.ourProducts')}</h2>
        
        <div className="products-grid">
          {products.map(product => (
            <div className="product-grid-item" key={product.id}>
              <ProductCard 
                id={product.id}
                image={product.image}
                title={product.title}
                power={product.power}
                price={product.price}
                category={product.category}
                description={product.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
