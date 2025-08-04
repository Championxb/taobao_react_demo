import './App.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';

// 图片懒加载组件
const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik02MCA2MEM3MC40NTg0IDYwIDc5IDUxLjQ1ODQgNzkgNDFDNzkgMzAuNTQxNiA3MC40NTg0IDIyIDYwIDIyQzQ5LjU0MTYgMjIgNDEgMzAuNTQxNiA0MSA0MUM0MSA1MS40NTg0IDQ5LjU0MTYgNjAgNjAgNjBaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjwvc3ZnPgo=');
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();
  const observer = new IntersectionObserver(
    (entries) => {
      if(entries[0].isIntersecting){
        setImageSrc(src);
        setIsLoaded(true);
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  
  useEffect(() => {
    // 检查图片元素是否存在 存在才添加到观察列表
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <div className={`lazy-image-container ${isLoaded ? 'loaded' : ''}`}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoaded ? 'fade-in' : ''}`}
        loading="lazy"
      />
    </div>
  );
};

function App() {
  // 主题状态管理
  const [theme, setTheme] = useState('light');

  // 切换主题函数
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // 根据主题返回对应的类名
  const getThemeClass = useMemo(() => {
    return theme === 'light' ? 'taobao-app light-theme' : 'taobao-app dark-theme';
  },[theme])

  // 模拟商品数据 - 使用真实的商品图片URL
  const products = [
    { id: 1, name: '夏季新款连衣裙', price: 129, image: 'https://picsum.photos/300/300?random=1' },
    { id: 2, name: '男士休闲运动鞋', price: 299, image: 'https://picsum.photos/300/300?random=2' },
    { id: 3, name: '苹果13 128G', price: 4999, image: 'https://picsum.photos/300/300?random=3' },
    { id: 4, name: '小米手环7', price: 229, image: 'https://picsum.photos/300/300?random=4' },
    { id: 5, name: '韩版宽松T恤', price: 59, image: 'https://picsum.photos/300/300?random=5' },
    { id: 6, name: '无线蓝牙耳机', price: 199, image: 'https://picsum.photos/300/300?random=6' },
    { id: 7, name: '智能手表', price: 899, image: 'https://picsum.photos/300/300?random=7' },
    { id: 8, name: '防晒霜套装', price: 89, image: 'https://picsum.photos/300/300?random=8' },
    { id: 9, name: '瑜伽垫', price: 49, image: 'https://picsum.photos/300/300?random=9' },
    { id: 10, name: '保温杯', price: 79, image: 'https://picsum.photos/300/300?random=10' },
    { id: 11, name: '背包', price: 159, image: 'https://picsum.photos/300/300?random=11' },
    { id: 12, name: '台灯', price: 99, image: 'https://picsum.photos/300/300?random=12' },
  ];

  // 分类数据
  const categories = [
    { id: 1, name: '首页', icon: '🏠' },
    { id: 2, name: '服饰', icon: '👕' },
    { id: 3, name: '数码', icon: '📱' },
    { id: 4, name: '家居', icon: '🏠' },
    { id: 5, name: '美食', icon: '🍜' },
    { id: 6, name: '美妆', icon: '💄' },
    { id: 7, name: '运动', icon: '🏃' },
    { id: 8, name: '更多', icon: '⋯' },
  ];

  return (
    <div className={getThemeClass}>
      {/* 顶部导航栏 */}
      <header className="top-nav">
        <div className="logo">淘宝</div>
        <div className="search-box">
          <input type="text" placeholder="搜索商品..." />
        </div>
        <div className="cart-icon">🛒</div>
      </header>

      {/* 分类图标区域 */}
      <div className="categories">
        {categories.map(category => (
          <div key={category.id} className="category-item">
            <div className="category-icon">{category.icon}</div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>

      {/* 商品列表区域 - 使用懒加载图片 */}
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <LazyImage
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-name">{product.name}</div>
            <div className="product-price">¥{product.price}</div>
          </div>
        ))}
      </div>

      {/* 底部导航栏 */}
      <footer className="bottom-nav">
        <div className="nav-item active">首页</div>
        <div className="nav-item">分类</div>
        <div className="nav-item">购物车</div>
        <div className="nav-item">我的淘宝</div>
        <div className="nav-item theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </div>
      </footer>
    </div>
  );
}

export default App;
