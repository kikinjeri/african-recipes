let quotes = [];
let index = 0;

// Load quotes
async function loadQuotes() {
  try {
    const response = await fetch("quotes.json");
    quotes = await response.json();
    showQuote(true);
  } catch (error) {
    document.getElementById("quote").innerText = "Failed to load quotes.";
    console.error(error);
  }
}

// Display current quote with animation
function showQuote(init = false, direction = "right") {
  if (!quotes.length) return;

  const quoteObj = quotes[index];
  const quoteCard = document.getElementById("quoteCard");
  const recipeColumns = document.getElementById("recipeColumns");
  const recipeName = document.getElementById("recipeName");

  if (!init) {
    quoteCard.classList.add(direction === "left" ? "slide-out-left" : "slide-out-left");
    recipeColumns.style.opacity = 0;
    setTimeout(() => {
      updateContent(quoteObj);
      quoteCard.classList.remove("slide-out-left");
      quoteCard.classList.add("slide-in-right");
      recipeColumns.style.opacity = 1;
    }, 300);
  } else {
    updateContent(quoteObj);
  }
}

function updateContent(quoteObj) {
  document.getElementById("quote").innerText = quoteObj.quote;
  document.getElementById("author").innerText = quoteObj.country;

  const flagCode = getCountryCode(quoteObj.country);
  const flagImg = document.getElementById("flag");
  flagImg.src = `https://flagcdn.com/120x90/${flagCode}.png`;
  flagImg.alt = `${quoteObj.country} flag`;

  const recipeDiv = document.getElementById("recipeColumns");
  const recipeName = document.getElementById("recipeName");
  const recipe = quoteObj.recipe;

  if (recipe) {
    recipeName.innerText = recipe.name;
    recipeDiv.innerHTML = `
      <div class="recipe-column">
        <h4>Ingredients</h4>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
      <div class="recipe-column">
        <h4>Steps</h4>
        <ol>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>
      </div>
    `;
  } else {
    recipeName.innerText = "No recipe available";
    recipeDiv.innerHTML = "";
  }
}

// Navigation
function nextQuote() {
  index = (index + 1) % quotes.length;
  showQuote(false, "right");
}

function prevQuote() {
  index = (index - 1 + quotes.length) % quotes.length;
  showQuote(false, "left");
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

// Country codes
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
  if (e.key === "Enter") searchQuote();
});
document.getElementById("nextBtn").addEventListener("click", nextQuote);
document.getElementById("prevBtn").addEventListener("click", prevQuote);

loadQuotes();

