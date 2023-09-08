'use client';

import _ from "underscore";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useState, FC, useEffect } from "react"

import { IProduct } from "@/models";
import { getProducts } from "@/api/products";
import { Card, Dropdown, Header, LoadMore, LoadingCover } from "@/components"
import { BRAND, FILTER_OPTIONS, PRICE_RANGE, SORT_BY, SORT_OPTIONS } from "@/constants";

const Products: FC = () => {

  const session = useSession();

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

  useEffect(() => {

    if (session.status !== 'loading') {

      getProducts(page, session.data?.user.access_token)
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
        .catch(err => alert(err))
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

  const renderProducts = () => {
    return products
      .filter(product => product.price <= range)
      .filter(product => brand === BRAND ? true : product.brand === brand)
      .map(product => (
        <Link href={`/products/${product._id}`}>
          <Card
            key={product._id}
            title={product.name}
            image="/assets/Model.webp"
            text1={'£' + product.price}
            text2={product.brand}
            quantity={0}
          />
        </Link >
      ));
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
                  key={index}
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
              renderItem={() =>
                <div className="bg-white p-3 rounded">
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
                    key={index}
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

      </div>

    </>
  )
}

export default Products;