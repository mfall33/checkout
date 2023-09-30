'use client';

import _ from "underscore";
import Toast from 'react-hot-toast';
import { useSession } from "next-auth/react";
import React, { useState, FC, useEffect } from "react";

import { IProduct } from "@/models";
import useStore from "@/store/useStore";
import { useProductsStore } from "@/store";
import { getProducts } from "@/api/products";
import { addToCart, getCart } from "@/api/cart";
import { Dropdown, Header, LoadMore, LoadingCover, ProductCard } from "@/components"
import { BRAND, FILTER_OPTIONS, PRICE_RANGE, SORT_BY, SORT_OPTIONS } from "@/constants";

const Products: FC = () => {

  const session = useSession();

  const productStore = useStore(useProductsStore, (state => state));

  const [page, setPage] = useState<Number>(0);

  const [loading, setLoading] = useState<Boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loadMore, setLoadMore] = useState<Boolean>(true);

  const [brand, setBrand] = useState<string>(BRAND);
  const [brands, setBrands] = useState<String[]>([]);

  const [sort, setSort] = useState<string>(SORT_BY);
  const [sortBy, setSortBy] = useState<string>("");

  const [range, setRange] = useState<number>(0);
  const [maxRange, setMaxRange] = useState<number>(0);

  useEffect(() => {

    if (session.status !== 'loading') {

      const token = session.data?.user.access_token;

      getCart(token)
        .then(productStore?.setCart)
        .catch(err => Toast.error("Failed to fetch Cart"));

      getProducts(page, token)
        .then((data) => {

          // initialize array
          let newProducts = [...products, ...data.products];

          // sort array
          newProducts = sortProducts(newProducts, sortBy);

          // set array
          setProducts(newProducts);

          const dearestProductPrice = Math.max(...newProducts.map(prod => prod.price));
          setMaxRange(dearestProductPrice);
          // if range is 0 it needs to be set at highest to show all
          if (range === 0) {
            setRange(dearestProductPrice);
          }

          let tmpBrands: String[] = []
          newProducts.forEach((prod: IProduct) => {
            if (tmpBrands.indexOf(prod.brand) < 0)
              tmpBrands.push(prod.brand)
          })

          setBrands(tmpBrands);

          if (data.page !== page) {
            setPage(data.page);
          }

          if (!data?.next_page) {
            setLoadMore(false);
          }

          setTimeout(function () {
            setLoading(false)
          }, 1000)

        })
        .catch(err => Toast.error("Failed to fetch products..."))
      // come back and handle this properly with an error message
    }

  }, [page, session.status])

  useEffect(() => {
    if (session.status === 'authenticated') {
      setTimeout(function () {
        setLoading(false)
      }, 1000)

    }
  }, [session.status])

  const handleSortClear = () => {

    setSort(SORT_BY);
    const newProducts = sortProducts(products, '');
    setProducts(newProducts);

  }
  const handleBrandClear = () => {
    setBrand(BRAND)
  }

  const handlePriceRangeClear = () => {
    setRange(maxRange)
  }

  const handleRangeChange = (e: Object) => {
    setRange(e.target.value);
  }

  const handleSortSelection = (item: Object) => {

    setSort(item.name)
    setSortBy(item.key)
    const newProds = sortProducts(products, item.key);
    setProducts(newProds);

  }

  const handleBrandSelection = (item: string) => {
    setBrand(item)
  }

  const addProductToCart = async (product: IProduct) => {

    try {

      const token = session.data?.user.access_token;

      await addToCart(token, product._id);

      const cart = await getCart(token);

      productStore?.setCart(cart);

      Toast(`(${product.name} - ${product.brand}) - added to Cart`);

    } catch (e) {

      Toast.error("Failed to add Product to Cart");

    }

  }

  const sortProducts = (products: IProduct[], sorter: string) => {

    switch (sorter) {
      case 'price-low-high':
        products = products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        products = products.sort((a, b) => b.price - a.price);
        break;
      default:
        products = _.sortBy(products, 'name');
        break;
    }

    return products;
  }

  const renderProducts = () => {
    return products
      .filter(product => product.price <= range)
      .filter(product => brand === BRAND ? true : product.brand === brand)
      .map((product: IProduct) =>
        <ProductCard
          id={product._id}
          inWishList={productStore.wishList.some(prod => prod?._id === product._id)}
          onHeartClick={(e) => {
            e.preventDefault();
            productStore.addToWishList(product)
          }}
          href={`/products/${product._id}`}
          key={product._id}
          title={product.name}
          image="/assets/Model.webp"
          text1={'£' + product.price}
          cardBtn1Disabled={productStore.cart.products.some(prod => prod.product._id === product._id)}
          text2={product.brand}
          quantity={product.quantity}
          cardBtn1Text="Add to Basket"
          cardBtn1Click={() => addProductToCart(product)}
        />
      );
  };

  return (
    <>

      <LoadingCover active={loading} />

      <Header />
      <div className="container m-auto px-3 md:px-0 py-5">

        <div className="grid grid-cols-1 gap-4 pb-3 border-b-2 border-black mb-3">

          <div className="flex flex-row flex-wrap col-span-2 p-3">
            <h1 className="font-mono text-2xl mb-2">Shop til you drop!</h1>
            <p className="font-mono text-sm font-light">Indulge in a shopping extravaganza with our 'Shop til you drop!' collection on our ecommerce website. Discover a treasure trove of irresistible deals, trendy fashion, cutting-edge electronics, and more. Unleash your inner shopaholic and explore a world of limitless choices. Whether you're seeking the latest fashion statements or tech innovations, our curated selection ensures you'll find everything you desire. Get ready to shop with abandon and treat yourself to a truly unforgettable retail therapy experience!</p>
          </div>


          <div className="flex items-center">

            <Dropdown
              active={(sort !== SORT_BY)}
              items={SORT_OPTIONS}
              option={sort}
              side={"right"}
              onClearPress={handleSortClear}
              renderItem={(item, index) =>
                <li
                  key={`${index}-${item.name}`}
                  className={`transition-all shadow hover:shadow-lg p-3 bg-white border-black rounded cursor-pointer mb-2 ${sort === item.name && 'border-2'}`}
                  onClick={() => handleSortSelection(item)}>
                  {item.name}
                </li>
              }
            />

            <Dropdown
              active={range < maxRange}
              items={FILTER_OPTIONS}
              option={PRICE_RANGE}
              side={"right"}
              onClearPress={handlePriceRangeClear}
              renderItem={(item, index) =>
                <div className="bg-white p-3 rounded" key={`${index}-${item}`}>
                  <label className="font-normal">Price up to: <span className="font-semibold">£{range}</span></label>
                  <input
                    type="range"
                    value={range}
                    onChange={handleRangeChange}
                    className="w-full"
                    max={maxRange}
                  />
                </div>
              }
            />

            {brands &&
              <Dropdown
                active={brand !== BRAND}
                items={brands}
                option={brand}
                onClearPress={handleBrandClear}
                side={"right"}
                renderItem={(item: string, index: number) =>
                  <li
                    key={`${index}-${item}`}
                    className={`transition-all shadow hover:shadow-lg p-3 bg-white border-black rounded cursor-pointer mb-2 ${brand === item && 'border-2'}`}
                    onClick={() => handleBrandSelection(item)}>
                    {item}
                  </li>

                }
              />}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {!loading && renderProducts()}
        </div>

        {!loading && loadMore &&
          <LoadMore onClick={() => setPage(+page + 1)} />
        }

      </div >

    </>
  )
}

export default Products;