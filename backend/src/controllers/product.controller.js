exports.getProducts = (req, resp) => {
  const productMessage = "Product list!";
  resp.status(200).send(productMessage);
};