let quotes = [];
let index = 0;

async function loadQuotes() {
  try {
    const response = await fetch("quotes.json");
    quotes = await response.json();
    showQuote(); // Show first quote by default
  } catch (error) {
    document.getElementById("quote").innerText = "Failed to load quotes.";
    console.error(error);
  }
}

function showQuote() {
  const quoteObj = quotes[index];
  document.getElementById("quote").innerText = quoteObj.quote;
  document.getElementById("author").innerText = quoteObj.country;

  // Display country flag
  const flagCode = getCountryCode(quoteObj.country);
  document.getElementById("flag").src = `https://flagcdn.com/40x30/${flagCode}.png`;
  document.getElementById("flag").alt = quoteObj.country + " flag";

  // Display recipe
  const recipeDiv = document.getElementById("recipe");
  const recipe = quoteObj.recipe;
  recipeDiv.innerHTML = `
    <h3>${recipe.name}</h3>
    <strong>Ingredients:</strong>
    <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
    <strong>Steps:</strong>
    <ol>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>
  `;
}

// Search quote by country
function searchQuote() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const foundIndex = quotes.findIndex(q => q.country.toLowerCase() === input);

  if (foundIndex !== -1) {
    index = foundIndex;
    showQuote();
  } else {
    alert("No quote found for that country.");
  }
}

// ISO 3166-1 alpha-2 codes for African countries
function getCountryCode(countryName) {
  const codes = {
    "Ghana": "gh",
    "Nigeria": "ng",
    "Kenya": "ke",
    "South Africa": "za",
    "Uganda": "ug",
    "Ethiopia": "et",
    "Senegal": "sn",
    "Morocco": "ma",
    "Egypt": "eg",
    "Tanzania": "tz",
    "Algeria": "dz",
    "Cameroon": "cm",
    "Zimbabwe": "zw",
    "Rwanda": "rw",
    "Ivory Coast": "ci",
    "Mali": "ml",
    "Sudan": "sd",
    "Botswana": "bw",
    "Namibia": "na"
  };
  return codes[countryName] || "af"; // fallback flag
}

loadQuotes();

