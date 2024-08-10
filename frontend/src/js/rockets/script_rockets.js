// Function to handle click event on rocket cards
function handleRocketClick(rocket) {
  // Open rocket details page in a new tab
  const detailsPage = window.open(
    "index_details.html?id=" + rocket.id,
    "_self"
  );
}

async function fetchRocketData() {
  try {
    const response = await fetch("/src/data/rockets.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rocket data:", error);
    return [];
  }
}

// document.getElementById("key").addEventListener("keyup", function(event) {
//   // Checking if key pressed is ENTER or not 
//             // if the key pressed is ENTER 
//             // click listener on button is called 
//             if (event.key === "Enter") { 
//               displayRockets();
//               event.target.blur();
//           } 
// })



// Function to display rocket cards
async function displayRockets() {
  const rockets = await fetchRocketData();
  const rocketContainer = document.getElementById("rocketsContainer");
  rocketContainer.innerHTML = ""; // Clear existing cards

  let key = document.getElementById("key").value;

  let found = false;
  document.getElementById("warn").style.display = "none";

  rockets.forEach((rocket) => {

    if(key != "" && rocket.name.toLowerCase().search(key.toLowerCase()) == -1 && rocket.org.toLowerCase().search(key.toLowerCase()) == -1)
    {
      return;
    }

    found = true;
    const rocketCard = document.createElement("div");
    rocketCard.classList.add("card");

    const image = document.createElement("img");
    image.src = rocket.image;
    rocketCard.appendChild(image);

    const info = document.createElement("div");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    const link = document.createElement("a");

    info.classList.add("info");

    h1.classList.add("name");
    h1.textContent = rocket.name;
    info.appendChild(h1);

    h2.classList.add("ord");
    h2.textContent = rocket.org;
    info.appendChild(h2);

    link.textContent = "DETAILS";
    link.addEventListener("click", () => handleRocketClick(rocket)); // Attach click event listener
    info.appendChild(link);

    rocketCard.appendChild(info);

    // Customize card display as needed

    rocketContainer.appendChild(rocketCard);
  });

  if(!found)
  {
    document.getElementById("warn").style.display = "block";
  }
}

// Initial display of all rockets
displayRockets();


