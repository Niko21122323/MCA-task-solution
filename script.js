const getData = async () => {
  try {
    const response = await fetch(
      "https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
};

const calculateCostAndCount = (productGroups) => {
  let cost = 0;
  let count = 0;

  for (const { price } of productGroups) {
    cost += price;
    count++;
  }

  return { cost, count };
};

const generateOutput = (groupName, arrayOfProducts) => {
  return `. ${groupName}\n${arrayOfProducts
    .map(
      ({ name, price, description, weight }) =>
        `... ${name}\n` +
        `    Price: $${price}\n` +
        `    ${
          description.length > 10
            ? description.substring(0, 10) + "..."
            : description
        }\n` +
        `    Weight: ${weight === undefined ? "N/A" : weight + "g"}\n`
    )
    .join("")}`;
};

const fetchAndDisplayProductData = async () => {
  const products = await getData();

  const domesticProducts = products
    .filter((product) => product.domestic)
    .sort((a, b) => a.name.localeCompare(b.name));
  const importedProducts = products
    .filter((product) => !product.domestic)
    .sort((a, b) => a.name.localeCompare(b.name));

  const { cost: domesticCost, count: domesticCount } =
    calculateCostAndCount(domesticProducts);
  const { cost: importedCost, count: importedCount } =
    calculateCostAndCount(importedProducts);

  const output = [
    generateOutput("Domestic", domesticProducts),
    generateOutput("Imported", importedProducts),
    `Domestic cost: $${domesticCost.toFixed(1)}\n`,
    `Imported cost: $${importedCost.toFixed(1)}\n`,
    `Domestic count: ${domesticCount}\n`,
    `Imported count: ${importedCount}\n`,
  ].join("");

  console.log(output);
};

fetchAndDisplayProductData();
