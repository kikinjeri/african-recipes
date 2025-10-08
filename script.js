let quotes = [];
let index = 0;

async function loadQuotes() {
  try {
    const response = await fetch("quotes.json");
    quotes = await response.json();
    showQuote();
  } catch (error) {
    document.getElementById("quote").innerText = "Failed to load quotes.";
    console.error(error);
  }
}

function showQuote() {
  if (!quotes.length) return;

  const quoteObj = quotes[index];
  document.getElementById("quote").innerText = quoteObj.quote;
  document.getElementById("author").innerText = quoteObj.country;

  const flagCode = getCountryCode(quoteObj.country);
  const flagImg = document.getElementById("flag");
  flagImg.src = `https://flagcdn.com/120x90/${flagCode}.png`;
  flagImg.alt = `${quoteObj.country} flag`;

  const recipeDiv = document.getElementById("recipe");
  const recipe = quoteObj.recipe;
  if(recipe) {
    recipeDiv.innerHTML = `
      <h3>${recipe.name}</h3>
      <strong>Ingredients:</strong>
      <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      <strong>Steps:</strong>
      <ol>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>
    `;
  } else {
    recipeDiv.innerHTML = "<p>No recipe available.</p>";
  }
}

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

function nextQuote() {
  index = (index + 1) % quotes.length;
  showQuote();
}

function prevQuote() {
  index = (index - 1 + quotes.length) % quotes.length;
  showQuote();
}

function getCountryCode(countryName) {
  const codes = {
    "Ghana":"gh","Nigeria":"ng","Kenya":"ke","South Africa":"za","Uganda":"ug",
    "Ethiopia":"et","Senegal":"sn","Morocco":"ma","Egypt":"eg","Tanzania":"tz",
    "Algeria":"dz","Cameroon":"cm","Zimbabwe":"zw","Rwanda":"rw","Ivory Coast":"ci",
    "Mali":"ml","Sudan":"sd","Botswana":"bw","Namibia":"na"
  };
  return codes[countryName] || "af";
}

// Event listeners
document.getElementById("searchBtn").addEventListener("click", searchQuote);
document.getElementById("searchInput").addEventListener("keypress", e => {
  if(e.key === "Enter") searchQuote();
});
document.getElementById("nextBtn").addEventListener("click", nextQuote);
document.getElementById("prevBtn").addEventListener("click", prevQuote);

loadQuotes();
