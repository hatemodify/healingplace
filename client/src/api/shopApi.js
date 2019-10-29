export default {
  getShopDetailApi: shopId =>
    `//dev.local.com:9998/product/productdetail/${shopId}`,
  aroundShop: ({ latitude, longitude }) =>
    `//dev.local.com:9998/shop/near/${latitude}/${longitude}`
}
