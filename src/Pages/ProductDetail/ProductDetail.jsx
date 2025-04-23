import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import './ProductDetail.css';
import { products } from '../../data/products';
import { FaShoppingCart } from 'react-icons/fa';
import backIcon from '../../assets/images/back-icon.svg';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { translate } = useLanguage();

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Mahsulot topilmadi!</h2>
        <Link to="/" className="back-link">{translate('productDetail.backToMain')}</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  // Get product-specific technical specs based on ID
  const getProductSpecs = () => {
    // Default specs (for most products)
    let generatorSpecs = {
      title: product.title,
      power: product.power,
      nominalPower: Math.round(parseInt(product.power) * 0.9) + "kW",
      frequency: "50 Hz",
      voltage: "220V / 380V",
      phase: "Uch fazali",
      powerFactor: "0,8",
      engine: "WEICHAI 12M33D1108E200",
      fuelCapacity: "1600L",
      ats: "Ha",
      controlPanel: "Ha",
      oilHeater: "Ha",
      waterHeater: "Ha"
    };
    
    let engineSpecs = {
      model: "WEICHAI 12M33D1108E200",
      type: "V shaklidagi 12 silindrli",
      diameter: "150x185",
      volume: "39.2L",
      airIntake: "Turbokompressor",
      compressionRatio: "16.4:1",
      speed: "1500",
      power: "1108KW",
      fuelType: "Dizel",
      fuelConsumption: "≤195",
      controlSystem: "Elektron",
      startMethod: "24V DC",
      coolingMethod: "Suv bilan sovutish"
    };
    
    let alternatorSpecs = {
      frequency: "50HZ",
      power: "1000KW",
      voltage: "400V",
      excitationMethod: "100% mis cho'tkasiz",
      insulationClass: "H",
      speed: "1500",
      protection: "IP23",
      connectionMode: "Uch fazali, to'rt simli",
      voltageRegulation: "AVR"
    };
    
    // Product ID 2 - HK600DG21SD specs based on the provided images
    if (product.id === 2) {
      generatorSpecs = {
        title: "HK600DG21SD",
        power: "600kW",
        nominalPower: "600 kW",
        frequency: "50 Hz",
        voltage: "400 V",
        current: "1710A",
        phase: "Trexfazniy",
        powerFactor: "0,8",
        engine: "HK600DG21SD",
        fuelType: "Dizel",
        fuelCapacity: "600 litr",
        ats: "imet",
        controlPanel: "imet",
        oilHeater: "imet",
        waterHeater: "imet"
      };
      
      engineSpecs = {
        model: "HK600DG21SD",
        type: "8 tsilindrov V-tipa",
        diameter: "138x168",
        volume: "31 L",
        airIntake: "Turbirovanniy s interkulyerom",
        compressionRatio: "16.4:1",
        speed: "1500",
        power: "750KW",
        fuelType: "Dizel",
        fuelConsumption: "≤ 200",
        controlSystem: "Elektronniy",
        oilCapacity: "38,4",
        antifreezeCapacity: "80",
        startMethod: "24V DC x 2",
        coolingMethod: "Vodyanoe oxlajdenie"
      };
      
      alternatorSpecs = {
        frequency: "50HZ",
        power: "600KW",
        voltage: "400V",
        excitationMethod: "100% med, beszchetochniy",
        insulationClass: "H",
        speed: "1500",
        protection: "IP23",
        connectionMode: "Trexfazniy, chetyirexprovodniy",
        voltageRegulation: "AVR"
      };
    }
    
    // Product ID 3 - HK500DG21SD specs based on the provided images
    else if (product.id === 3) {
      generatorSpecs = {
        title: "HK500DG21SD",
        power: "500KW / 625KVA",
        nominalPower: "500KW / 625KVA",
        frequency: "50HZ",
        voltage: "400V",
        phase: "Three Phase",
        powerFactor: "0,8",
        engine: "SHENDONG SDV550",
        fuelType: "Diesel",
        ats: "Yes",
        controlPanel: "FORTRUST",
        canopySet: "Canopy Generator Set",
        dimensions: "3700x1700x2200",
        weight: "4500KG"
      };
      
      engineSpecs = {
        model: "SHENDONG SDV550",
        type: "12 cylinders",
        diameter: "135x155",
        volume: "22.6L",
        airIntake: "Turbocharged",
        compressionRatio: "10.8:1",
        speed: "1500",
        power: "550KW / 687.5KVA",
        fuelType: "Diesel",
        injectionType: "Direct",
        controlSystem: "Electric",
        startMethod: "24V DC x 2",
        coolingMethod: "Water Cooling"
      };
      
      alternatorSpecs = {
        manufacturer: "WUXI CUMMINS",
        frequency: "50HZ",
        power: "500KW / 625KVA",
        voltage: "400V",
        excitationMethod: "Brushless",
        insulationClass: "H",
        speed: "1500",
        protection: "IP23",
        connectionMode: "Three phase four wire",
        voltageRegulation: "AVR"
      };
    }
    
    // Product ID 4 - HK250GF specs based on the provided images
    else if (product.id === 4) {
      generatorSpecs = {
        title: "HK250GF",
        power: "250 КВт - 312.5 кВа",
        nominalPower: "250 КВт - 312.5 кВа",
        voltage: "400 В",
        frequency: "50 Гц",
        phase: "Трехфазный",
        powerFactor: "0,8",
        manufacturer: "HUAKUN",
        fuelType: "Дизельные",
        fuelCapacity: "250",
        fuelConsumption: "40-45 литр/час",
        controlPanel: "FORTRUST",
        oilHeater: "есть",
        ats: "есть",
        canopySet: "Генераторная установка навеса",
        dimensions: "3900x1200x1900",
        weight: "2180 кг"
      };
      
      engineSpecs = {
        manufacturer: "WEIFANG HUAKUN DIESEL ENGINE",
        model: "HKWP1276LD",
        cylinders: "6 цилиндров",
        diameter: "126x155",
        volume: "12.50 л",
        airIntake: "с турбонаддувом",
        compressionRatio: "16:1",
        speed: "1500",
        fuelType: "Дизель",
        power: "275 кВт - 344 кВа",
        injectionType: "Прямой",
        controlSystem: "Электрический",
        startMethod: "24V ДС",
        coolingMethod: "Водяное охлаждение"
      };
      
      alternatorSpecs = {
        model: "HUAKUN",
        frequency: "50 Гц",
        power: "250 кВ / 312,5 кВа",
        voltage: "400 В",
        excitationMethod: "Бесщеточный",
        insulationClass: "H",
        speed: "1500",
        protection: "IP23",
        connectionMode: "Трехфазный, четырехпроводный",
        voltageRegulation: "AVR"
      };
    }
    
    // Product ID 5 - HK220DG21 specs based on the provided images
    else if (product.id === 5) {
      generatorSpecs = {
        title: "HK220DG21",
        power: "220KW / 275KVA",
        nominalPower: "220KW / 275KVA",
        voltage: "400V",
        frequency: "50HZ",
        phase: "Three Phase",
        powerFactor: "0.8",
        engineModel: "HUAKUN HK618ZLD",
        fuelType: "Diesel",
        ats: "Yes",
        controlPanel: "FORTRUST",
        canopySet: "Canopy Generator Set",
        dimensions: "3700x1200x1900",
        weight: "1900KG"
      };
      
      engineSpecs = {
        manufacturer: "HUAKUN HK618ZLD",
        cylinders: "6 cylinders",
        diameter: "126x155",
        volume: "11.60L",
        airIntake: "Intercooler turbocharged",
        compressionRatio: "16:1",
        speed: "1500",
        power: "302KW",
        fuelType: "Diesel",
        injectionType: "Direct",
        governor: "Electric",
        startMethod: "24V DC",
        coolingMethod: "Water Cooling"
      };
      
      alternatorSpecs = {
        manufacturer: "WUXI CUMMINS",
        frequency: "50HZ",
        power: "220KW",
        voltage: "400V",
        excitationMethod: "Brushless",
        insulationClass: "H",
        speed: "1500",
        protection: "IP23",
        connectionMode: "Three phase four wire",
        voltageRegulation: "AVR"
      };
    }
    
    // Product ID 6 - HK100GF specs based on the provided images
    else if (product.id === 6) {
      generatorSpecs = {
        title: "HK100GF",
        power: "100 кВт",
        nominalPower: "100 кВт",
        voltage: "400 В",
        frequency: "50 Гц",
        phase: "Трехфазный",
        powerFactor: "0,8",
        manufacturer: "HUAKUN",
        fuelType: "Дизельные",
        ats: "Необязательный",
        canopySet: "Генераторная установка навеса",
        dimensions: "2860x1120x1530",
        weight: "1480 кг"
      };
      
      engineSpecs = {
        manufacturer: "WEIFANG HUAKUN DIESEL ENGINE",
        model: "R6105AZLD",
        cylinders: "6 цилиндров",
        diameter: "105x125",
        volume: "6.49 л",
        airIntake: "с турбонаддувом",
        compressionRatio: "16:1",
        speed: "1500",
        fuelType: "Дизель",
        power: "110 кВт",
        injectionType: "Прямой",
        controlSystem: "Электрический",
        startMethod: "24V ДС",
        coolingMethod: "Водяное охлаждение"
      };
      
      alternatorSpecs = {
        frequency: "50 Гц",
        power: "100 кВ / 125 кВа",
        voltage: "400 В",
        excitationMethod: "Бесщеточный",
        insulationClass: "H",
        speed: "1500",
        protection: "IP23",
        connectionMode: "Трехфазный, четырехпроводный",
        voltageRegulation: "AVR"
      };
    }
    
    return { generatorSpecs, engineSpecs, alternatorSpecs };
  };
  
  const { generatorSpecs, engineSpecs, alternatorSpecs } = getProductSpecs();

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-header">
          <Link to="/" className="back-arrow">
            <img src={backIcon} alt="Back" className="back-icon" />
            <span>{translate('checkout.mainPage')}</span>
          </Link>
        </div>
        
        <div className="product-detail-content">
          <div className="product-image-container">
            <div className="product-category-badge">{translate('productDetail.generator')}</div>
            {product.power && <div className="product-power-badge">{product.power}</div>}
            <img src={product.image} alt={product.title} className="product-detail-image" />
          </div>
          
          <div className="product-info-container">
            <h1 className="product-model">{product.title}</h1>
            
            <div className="product-description">
              <p>HUAKUN {translate('productDetail.dieselGenerator')} HUAKUN HK618ZLD {translate('productDetail.engine')}. {translate('productDetail.canopyDesign')} FORTRUST {translate('productDetail.controlPanel')}. {translate('productDetail.industrialApplications')}.</p>
            </div>
            
            <div className="product-price-section">
              <div className="price-row">
                <div className="price-label">{translate('productDetail.price')}:</div>
                <div className="price-value">{product.price.toLocaleString()} so'm</div>
              </div>
            </div>
            
            <div className="product-actions">
              <button 
                onClick={handleAddToCart} 
                className="add-to-cart-btn"
              >
                <FaShoppingCart />
                <span>{translate('productDetail.addToCart')}</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="technical-specs-section">
          <h2 className="section-title">{translate('productDetail.technicalSpecs')}</h2>
          
          <div className="specs-table">
            <div className="specs-category">
              <h3 className="category-title">GENERATOR</h3>
              
              <div className="specs-row">
                <div className="specs-label">Model Name</div>
                <div className="specs-value">{generatorSpecs.title}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Rated Power</div>
                <div className="specs-value">{generatorSpecs.nominalPower}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Voltage</div>
                <div className="specs-value">{generatorSpecs.voltage}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Frequency</div>
                <div className="specs-value">{generatorSpecs.frequency}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Phase</div>
                <div className="specs-value">{generatorSpecs.phase}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Power Factor</div>
                <div className="specs-value">{generatorSpecs.powerFactor}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Engine Model</div>
                <div className="specs-value">{generatorSpecs.engine}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Fuel Type</div>
                <div className="specs-value">{generatorSpecs.fuelType}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">ATS</div>
                <div className="specs-value">{generatorSpecs.ats}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Control Panel</div>
                <div className="specs-value">{generatorSpecs.controlPanel}</div>
              </div>
            </div>
            
            <div className="specs-category">
              <h3 className="category-title">ENGINE</h3>
              
              <div className="specs-row">
                <div className="specs-label">Model</div>
                <div className="specs-value">{engineSpecs.model}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Type</div>
                <div className="specs-value">{engineSpecs.type}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Bore x Stroke(mm)</div>
                <div className="specs-value">{engineSpecs.diameter}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Displacement</div>
                <div className="specs-value">{engineSpecs.volume}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Aspiration</div>
                <div className="specs-value">{engineSpecs.airIntake}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Compression Ratio</div>
                <div className="specs-value">{engineSpecs.compressionRatio}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Speed (RPM)</div>
                <div className="specs-value">{engineSpecs.speed}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Rated Power</div>
                <div className="specs-value">{engineSpecs.power}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Fuel Type</div>
                <div className="specs-value">{engineSpecs.fuelType}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Control System</div>
                <div className="specs-value">{engineSpecs.controlSystem}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Start Method</div>
                <div className="specs-value">{engineSpecs.startMethod}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Cooling Method</div>
                <div className="specs-value">{engineSpecs.coolingMethod}</div>
              </div>
            </div>
            
            <div className="specs-category">
              <h3 className="category-title">ALTERNATOR</h3>
              
              <div className="specs-row">
                <div className="specs-label">Frequency</div>
                <div className="specs-value">{alternatorSpecs.frequency}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Power</div>
                <div className="specs-value">{alternatorSpecs.power}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Voltage</div>
                <div className="specs-value">{alternatorSpecs.voltage}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Exciting Mode</div>
                <div className="specs-value">{alternatorSpecs.excitationMethod}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Insulation Class</div>
                <div className="specs-value">{alternatorSpecs.insulationClass}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Speed (RPM)</div>
                <div className="specs-value">{alternatorSpecs.speed}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Protection</div>
                <div className="specs-value">{alternatorSpecs.protection}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Connection Mode</div>
                <div className="specs-value">{alternatorSpecs.connectionMode}</div>
              </div>
              
              <div className="specs-row">
                <div className="specs-label">Voltage Regulation</div>
                <div className="specs-value">{alternatorSpecs.voltageRegulation}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 

