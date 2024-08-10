window.onload = function () {
  // Get rocket ID from URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const rocketId = urlParams.get("id");

  // Load rocket details based on ID
  fetchRocketDetails(rocketId);
};

async function fetchRocketDetails(rocketId) {
  try {
    const response = await fetch("/src/data/rockets.json");
    const rockets = await response.json();

    // Find the rocket with the matching ID
    const rocket = rockets.find((rocket) => rocket.id === rocketId);

    if (rocket) {
      // Display rocket details
      displayRocketDetails(rocket);
    } else {
      console.error("Rocket not found:", rocketId);
    }
  } catch (error) {
    console.error("Error fetching rocket details:", error);
  }
}

function displayRocketDetails(rocket) {
  // Display rocket details on the page
  const rocketDetailsContainer = document.getElementById(
    "rocketDetailsContainer"
  );
  rocketDetailsContainer.innerHTML = `
    <div class="images">
        <div
            class="panel"
            style="background-image: url(${rocket.image})"
        ></div>
        <div
            class="panel"
            style="
            background-image: url(${rocket.images[0]});
            "
        ></div>
        <div
            class="panel"
            style="
            background-image: url(${rocket.images[1]});
            "
        ></div>
        <div
            class="panel"
            style="
            background-image: url(${rocket.images[2]});
            "
        ></div>
    </div>

<div class="details">
    <h2>${rocket.name}</h2>
    <span class="status">${rocket.status}</span>
    <h3>${rocket.org}</h3>
    <div class="performance">
        <span class="missions">${rocket.missions} Missions</span> |
        <span class="success">${rocket.successes}</span> |
        <span class="partial_fail">${rocket["partial failures"]}</span> | <span class="fail">${rocket.failures}</span> |
        <span class="rate">Rate: ${rocket["success rate"]}%</span> |
        <span class="streak">Streak: ${rocket["success streak"]}</span>
    </div>
    <hr />

    <p class="content">
        ${rocket.content}
    </p>

    <hr />

    <h4>Other Details</h4>

    <div class="other-details">
        <strong>Price: </strong><span class="value">USD ${rocket.price} million</span><br />
        <strong>Height: </strong><span class="value">${rocket.height} metres</span><br />
        <strong>Liftoff Thrust: </strong><span class="value">${rocket.thrust} kN</span><br />
        <strong>Payload to LEO: </strong><span class="value">${rocket.leo} kg</span><br />
        <strong>Payload to GTO: </strong><span class="value">${rocket.gto} kg</span><br />
        <strong>Stages: </strong><span class="value">${rocket.stages}</span><br />
        <strong>Strap-ons: </strong><span class="value">${rocket["strap-ons"]}</span><br />
        <strong>Fairing Diameter: </strong><span class="value">${rocket["fairing diameter"]} metres</span><br />
        <strong>Fairing Height: </strong><span class="value">${rocket["fairing height"]} metres</span><br />
    </div>
</div>
    `;

  let current_status = document.getElementsByClassName("status")[0];
  if(current_status.innerHTML == "Retired")
    current_status.style.backgroundColor = "rgb(141, 0, 0)";
  document.title = `${rocket.name}`;
}
