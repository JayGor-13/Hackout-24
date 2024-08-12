// // Imports
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { getLatLngObj, getSatelliteInfo, getSatelliteName } from "tle.js";

// // Setting up the renderer
// const w = window.innerWidth;
// const h = window.innerHeight;
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(w, h);
// document.body.appendChild(renderer.domElement);

// // Setting up the camera
// const fov = 75;
// const aspect = w / h;
// const near = 0.1;
// const far = 10000;
// const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.set(500, 0, 0);
// const scene = new THREE.Scene();

// const controls = new OrbitControls(camera, renderer.domElement);
// // controls.enableDamping = true;
// // controls.dampingFactor = 0.3;

// // Setting up the earthMesh
// const scale = 0.02;
// const radius = 6371 * scale;
// const geometry = new THREE.SphereGeometry(radius, 64, 32);
// const material = new THREE.MeshLambertMaterial();

// const loader = new THREE.TextureLoader();
// loader.load(
//   "/src/Images/earthmap_test.webp",
//   (texture) => onTextureLoaded(texture),
//   undefined,
//   (error) => console.log(error)
// );

// function onTextureLoaded(texture) {
//   material.map = texture;
//   material.color = new THREE.Color("white");
//   material.needsUpdate = true;
// }

// const earthMesh = new THREE.Mesh(geometry, material);
// earthMesh.name = "EARTH";

// scene.add(earthMesh);

// const sunLight = new THREE.AmbientLight("white", 1);
// scene.add(sunLight);

// function calcPosFromLatLonRad(lat, lon, radius) {
//   var phi = (90 - lat) * (Math.PI / 180);
//   var theta = (lon + 180) * (Math.PI / 180);

//   var x = -(radius * Math.sin(phi) * Math.cos(theta));
//   var z = radius * Math.sin(phi) * Math.sin(theta);
//   var y = radius * Math.cos(phi);

//   return [x, y, z];
// }

// class Satellite {
//   constructor(tle) {
//     this.dotGeo = new THREE.SphereGeometry(radius / 250, 10, 10);
//     this.dotMat = new THREE.MeshBasicMaterial({
//       color: 0xffffff,
//     });
//     this.dotMesh = new THREE.Mesh(this.dotGeo, this.dotMat);

//     this.tle = tle;

//     this.satName = getSatelliteName(this.tle);

//     const _info = getSatelliteInfo(this.tle);
//     this.lat = _info.lat;
//     this.lng = _info.lng;
//     this.height = _info.height;
//     this.velocity = _info.velocity;

//     this.position = calcPosFromLatLonRad(
//       this.lat,
//       this.lng,
//       radius + this.height * scale
//     );
//     this.dotMesh.position.set(
//       this.position[0],
//       this.position[1],
//       this.position[2]
//     );
//     this.dotMesh.visible = true;
//     this.dotMesh.name = "SATELLITE";
//     this.dotMesh.userData.satellite = this;
//     scene.add(this.dotMesh);
//   }
//   updateSatellite() {
//     // console.log(this.tle);
//     const _info = getSatelliteInfo(this.tle);
//     this.lat = _info.lat;
//     this.lng = _info.lng;
//     this.height = _info.height;
//     this.velocity = _info.velocity;
//     this.position = calcPosFromLatLonRad(
//       this.lat,
//       this.lng,
//       radius + this.height * scale
//     );
//     this.dotMesh.position.set(
//       this.position[0],
//       this.position[1],
//       this.position[2]
//     );
//   }
// }

// function readFileAndGetTLEs(filePath, callback) {
//   fetch(filePath)
//     .then((response) => response.text())
//     .then((data) => {
//       const lines = data.split("\n");
//       const tles = [];
//       for (let i = 0; i < lines.length; i += 3) {
//         const tle = lines
//           .slice(i, i + 3)
//           .join("\n")
//           .trim();
//         if (tle !== "") {
//           tles.push(tle);
//         }
//       }
//       callback(tles);
//     })
//     .catch((error) => {
//       console.error("Error reading file:", error);
//       callback([]);
//     });
// }

// function updateActiveSatellite() {
//   if (activeSatellite != null) {
//     document.getElementById("lat").innerHTML = activeSatellite.lat;
//     document.getElementById("lng").innerHTML = activeSatellite.lng;
//     document.getElementById("height").innerHTML = activeSatellite.height;
//     document.getElementById("velocity").innerHTML = activeSatellite.velocity;
//   }
// }

// // Usage example:
// const filePath = "/src/data/tles.txt";
// let satellites;
// readFileAndGetTLEs(filePath, (tles) => {
//   // Create Satellite objects for each TLE
//   satellites = tles.map((tle) => new Satellite(tle));

//   // Update satellites at regular intervals
//   const intervalTime = 1000;
//   const updateAll = setInterval(() => {
//     satellites.forEach((satellite) => satellite.updateSatellite());
//   }, intervalTime);
//   const updateActive = setInterval(() => {
//     updateActiveSatellite();
//   }, intervalTime);
// });

// const pointer = new THREE.Vector2();
// const raycaster = new THREE.Raycaster();
// let previousIntersectedObject = null;

// const onMouseMove = (event) => {
//   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(pointer, camera);
//   const intersects = raycaster.intersectObjects(scene.children);
//   // console.log(intersects.length);

//   if (intersects.length > 0) {
//     const intersectedObject = intersects[0].object;

//     // If the mouse moved from one object to another
//     if (previousIntersectedObject !== intersectedObject) {
//       // Revert color of the previous intersected object
//       if (previousIntersectedObject) {
//         if (
//           activeSatellite != null &&
//           previousIntersectedObject != activeSatellite.dotMesh
//         ) {
//           previousIntersectedObject.material.color.set(0xffffff);
//         } else if (activeSatellite == null) {
//           previousIntersectedObject.material.color.set(0xffffff);
//         }

//         const oldDiv = document.getElementsByClassName("floatingName")[0];
//         // console.log("OLD DIVE:", oldDiv);
//         if (oldDiv != null) {
//           document.body.removeChild(oldDiv);
//           document.body.style.cursor = "auto";
//         }
//       }

//       // Change color of the current intersected object
//       if (intersectedObject.name == "SATELLITE") {
//         if (
//           activeSatellite != null &&
//           intersectedObject != activeSatellite.dotMesh
//         )
//           intersectedObject.material.color.set(0x00ff00);
//         else if (activeSatellite == null)
//           intersectedObject.material.color.set(0x00ff00);

//         const newDiv = document.createElement("div");
//         newDiv.className = "floatingName";
//         newDiv.innerText = intersectedObject.userData.satellite.satName;
//         // console.log(newDiv.innerText);
//         newDiv.style.visibility = "visible";

//         // Convert pointer coordinates to pixel values
//         const posX = event.clientX - 30 + "px"; // Adding 10 for offset
//         const posY = event.clientY - 35 + "px"; // Adding 10 for offset

//         newDiv.style.left = posX;
//         newDiv.style.top = posY;
//         newDiv.style.zIndex = 10;
//         document.body.appendChild(newDiv);
//         // console.log(newDiv);
//         document.body.style.cursor = "pointer";
//       }

//       // Update previous intersected object
//       previousIntersectedObject = intersectedObject;
//     }
//   } else if (previousIntersectedObject) {
//     if (
//       activeSatellite != null &&
//       previousIntersectedObject != activeSatellite.dotMesh
//     ) {
//       previousIntersectedObject.material.color.set(0xffffff);
//     } else if (activeSatellite == null) {
//       previousIntersectedObject.material.color.set(0xffffff);
//     }

//     const oldDiv = document.getElementsByClassName("floatingName")[0];
//     // console.log("OLD DIVE:", oldDiv);
//     if (oldDiv != null) {
//       document.body.removeChild(oldDiv);
//       document.body.style.cursor = "auto";
//     }

//     previousIntersectedObject = null;
//   }
// };

// window.addEventListener("mousemove", onMouseMove);

// var activeSatellite = null;
// var focussed = false;

// const onMouseClick = (event) => {
//   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(pointer, camera);
//   const intersects = raycaster.intersectObjects(scene.children);

//   if (intersects.length > 0) {
//     const intersectedObject = intersects[0].object;

//     if (intersectedObject.name === "SATELLITE") {
//       const selectedSatellite = intersectedObject.userData.satellite;
//       setActiveSat(selectedSatellite);
//     }
//   }
// };

// var checkbox = document.getElementById("checkbox");

// checkbox.addEventListener("change", function () {
//   if (this.checked) {
//     console.log("Enabled Focus!");
//     focussed = true;
//   } else {
//     console.log("Disabled Focus!");
//     controls.target.set(0, 0, 0);
//     camera.lookAt(0, 0, 0);
//     focussed = false;
//   }
// });

// function setActiveSat(sat) {
//   if (activeSatellite != null) {
//     activeSatellite.dotMesh.material.color.set(0xffffff);
//   }

//   const satName = sat.satName;
//   const latitude = sat.lat;
//   const longitude = sat.lng;
//   const height = sat.height;
//   const velocity = sat.velocity;

//   document.getElementById("name").innerHTML = satName;
//   document.getElementById("lat").innerHTML = latitude;
//   document.getElementById("lng").innerHTML = longitude;
//   document.getElementById("height").innerHTML = height;
//   document.getElementById("velocity").innerHTML = velocity;

//   sat.dotMesh.material.color.set(0xff0000);

//   activeSatellite = sat;
//   console.log(activeSatellite.position);
//   const pos = activeSatellite.position;

//   camera.position.set(pos[0] + 20, pos[1] + 20, pos[2] + 20);
//   focussed = true;
//   checkbox.checked = true;
// }

// window.addEventListener("click", onMouseClick);

// document.getElementById("key").addEventListener("blur", function (event) {
//   const suggestionTimeout = setTimeout(() => {
//     console.log("Unfocussed");
//     document.getElementById("suggestions").style.display = "none";
//   }, 200); // Adjust the delay time as needed
// });

// document.getElementById("key").addEventListener("focus", function (event) {
//   console.log("Focussed");
//   document.getElementById("suggestions").style.display = "block";
// });

// // Event listener for input field
// document.getElementById("key").addEventListener("input", function (event) {
//   const searchText = event.target.value.toLowerCase();

//   // Clear existing suggestions
//   const suggestionsDiv = document.querySelector(".suggestions");
//   suggestionsDiv.innerHTML = "";

//   // Resetting the suggestions window
//   document.getElementById("suggestions").style.display = "block";
//   document.getElementById("suggestions").style.height = "fit-content";
//   document.getElementById("suggestions").style.padding = "10px";
//   document.getElementById("suggestions").style.paddingBottom = "40px";

//   if (searchText == "") {
//     document.getElementById("suggestions").style.height = "0px";
//     document.getElementById("suggestions").style.padding = "0px";
//     console.log("empty");
//     return;
//   }

//   const matchingSatellites = satellites.filter((satellite) =>
//     satellite.satName.toLowerCase().includes(searchText)
//   );

//   // Add new suggestion items
//   matchingSatellites.forEach((selectedSatellite) => {
//     const itemDiv = document.createElement("div");
//     itemDiv.classList.add("item");
//     itemDiv.textContent = selectedSatellite.satName;
//     suggestionsDiv.appendChild(itemDiv);

//     // Event listener for suggestion item click
//     itemDiv.addEventListener("click", function () {
//       // Change color of corresponding satellite
//       console.log("CLICKED");
//       setActiveSat(selectedSatellite);
//     });
//   });
// });

// // Function to animate the scene
// function animate() {
//   requestAnimationFrame(animate);

//   if (activeSatellite && focussed) {
//     const pos = activeSatellite.position;
//     camera.lookAt(pos[0], pos[1], pos[2]);
//     controls.target.set(pos[0], pos[1], pos[2]);
//   }

//   renderer.render(scene, camera);
//   // controls.update();
// }

// animate();

// function handleWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }
// window.addEventListener("resize", handleWindowResize, false);

// Imports
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { getGroundTracks, getLatLngObj, getOrbitTrack, getSatelliteInfo, getSatelliteName } from "tle.js";

// Constants
const scale = 0.02;
const radius = 6371 * scale;
const intervalTime = 1000;

// Global Variables
let satellites = [];
let activeSatellite = null;
let focussed = false;
let previousIntersectedObject = null;
let currentOrbitLine = null; // Global variable to store the current orbit line

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

// Initialize Scene, Camera, Renderer, and Controls
const { scene, camera, renderer, controls } = initScene();

// Load Earth Texture and Create Earth Mesh
const earthMesh = createEarthMesh();
scene.add(earthMesh);

// Add Lighting to the Scene
addLighting(scene);

// Load and Initialize Satellites
// const filePath = "/src/data/tles.txt";
// readFileAndGetTLEs(filePath, initializeSatellites);
fetchTLEsFromCelestrak(initializeSatellites);

// Event Listeners
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("resize", handleWindowResize);
document.getElementById("checkbox").addEventListener("change", toggleFocus);
document.getElementById("key").addEventListener("blur", hideSuggestions);
document.getElementById("key").addEventListener("focus", showSuggestions);
document.getElementById("key").addEventListener("input", filterSatellites);

// Animation Loop
animate();

// Function Definitions

function initScene() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10000);
  camera.position.set(500, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  return { scene, camera, renderer, controls };
}

function createEarthMesh() {
  const geometry = new THREE.SphereGeometry(radius, 64, 32);
  const material = new THREE.MeshLambertMaterial();

  const loader = new THREE.TextureLoader();
  loader.load(
    "/src/Images/earthmap_test.webp",
    (texture) => {
      material.map = texture;
      material.color = new THREE.Color("white");
      material.needsUpdate = true;
    },
    undefined,
    (error) => console.error(error)
  );

  const earthMesh = new THREE.Mesh(geometry, material);
  earthMesh.name = "EARTH";
  return earthMesh;
}

function addLighting(scene) {
  const sunLight = new THREE.AmbientLight("white", 1);
  scene.add(sunLight);
}

function fetchTLEsFromCelestrak(callback) {
  const url = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle';

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split("\n");
      const tles = [];

      for (let i = 0; i < lines.length; i += 3) {
        const tle = lines
          .slice(i, i + 3)
          .join("\n")
          .trim();
        if (tle !== "") tles.push(tle);
      }
      callback(tles);
    })
    .catch((error) => {
      console.error("Error fetching TLEs from Celestrak:", error);
      callback([]);
    });
}

// function readFileAndGetTLEs(filePath, callback) {
//   fetch(filePath)
//     .then((response) => response.text())
//     .then((data) => {
//       const lines = data.split("\n");
//       const tles = [];

//       for (let i = 0; i < lines.length; i += 3) {
//         const tle = lines
//           .slice(i, i + 3)
//           .join("\n")
//           .trim();
//         if (tle !== "") tles.push(tle);
//       }
//       callback(tles);
//     })
//     .catch((error) => {
//       console.error("Error reading file:", error);
//       callback([]);
//     });
// }

function initializeSatellites(tles) {
  satellites = tles.map((tle) => new Satellite(tle));
  setInterval(updateAllSatellites, intervalTime);
  setInterval(updateActiveSatellite, intervalTime);
}

class Satellite {
  constructor(tle) {
    this.tle = tle;
    this.satName = getSatelliteName(this.tle);
    // console.log(this.satName);
    this.updateSatelliteInfo();

    this.dotMesh = createSatelliteMesh(this);
    scene.add(this.dotMesh);
  }

  updateSatelliteInfo() {
    const _info = getSatelliteInfo(this.tle);
    this.lat = _info.lat;
    this.lng = _info.lng;
    this.height = _info.height;
    this.velocity = _info.velocity;
    this.position = calcPosFromLatLonRad(
      this.lat,
      this.lng,
      radius + this.height * scale
    );
  }

  updateSatelliteMeshPosition() {
    this.dotMesh.position.set(...this.position);
  }

  updateSatellite() {
    this.updateSatelliteInfo();
    this.updateSatelliteMeshPosition();
  }
}

function createSatelliteMesh(satelliteInstance) {
  const dotGeo = new THREE.SphereGeometry(radius / 250, 10, 10);
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const dotMesh = new THREE.Mesh(dotGeo, dotMat);
  dotMesh.visible = true;
  dotMesh.name = "SATELLITE";
  dotMesh.userData.satellite = satelliteInstance;
  // console.log(dotMesh.userData.satellite);
  return dotMesh;
}

function calcPosFromLatLonRad(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

function onMouseMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    handleObjectIntersection(intersects[0].object, event);
  } else if (previousIntersectedObject) {
    resetPreviousIntersectedObject();
  }
}

function handleObjectIntersection(intersectedObject, event) {
  if (previousIntersectedObject !== intersectedObject) {
    resetPreviousIntersectedObject();

    if (intersectedObject.name === "SATELLITE") {
      highlightSatellite(intersectedObject);
      showSatelliteName(intersectedObject, event);
      document.body.style.cursor = "pointer";
    }

    previousIntersectedObject = intersectedObject;
  }
}

function resetPreviousIntersectedObject() {
  if (previousIntersectedObject) {
    const isNotActiveSatellite =
      activeSatellite == null ||
      previousIntersectedObject !== activeSatellite.dotMesh;

    if (isNotActiveSatellite) {
      previousIntersectedObject.material.color.set(0xffffff);
    }

    const oldDiv = document.querySelector(".floatingName");
    if (oldDiv) document.body.removeChild(oldDiv);
    document.body.style.cursor = "auto";
  }
  previousIntersectedObject = null;
}

function highlightSatellite(intersectedObject) {
  const isNotActiveSatellite =
    activeSatellite == null || intersectedObject !== activeSatellite.dotMesh;

  if (isNotActiveSatellite) {
    intersectedObject.material.color.set(0x00ff00);
  }
}

function showSatelliteName(intersectedObject, event) {
  const newDiv = document.createElement("div");
  newDiv.className = "floatingName";
  newDiv.innerText = intersectedObject.userData.satellite.satName;
  // newDiv.innerText = "HELLO";
  newDiv.style.left = event.clientX - 30 + "px";
  newDiv.style.top = event.clientY - 35 + "px";
  newDiv.style.zIndex = 20;
  newDiv.style.visibility = "visible";
  document.body.appendChild(newDiv);
  // console.log(newDiv);
  // console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
  // console.log(newDiv.style.left);
  // console.log(newDiv.innerHTML);
}

function onMouseClick(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;

    if (intersectedObject.name === "SATELLITE") {
      const selectedSatellite = intersectedObject.userData.satellite;
      setActiveSat(selectedSatellite);
    }
  }
}

function toggleFocus() {
  focussed = checkbox.checked;
  if (!focussed) resetCamera();
}

function resetCamera() {
  controls.target.set(0, 0, 0);
  camera.lookAt(0, 0, 0);
}

function setActiveSat(satellite) {
  // console.log(satellite.tle);
  if (activeSatellite != null) {
    activeSatellite.dotMesh.material.color.set(0xffffff);
  }

  activeSatellite = satellite;
  updateSatelliteInfoPanel(satellite);

  satellite.dotMesh.material.color.set(0xff0000);

  // Set camera position
  camera.position.set(
    satellite.position[0] + 20,
    satellite.position[1] + 20,
    satellite.position[2] + 20
  );
  focussed = true;
  checkbox.checked = true;

  // Remove previous orbit line
  if (currentOrbitLine) {
    scene.remove(currentOrbitLine);
  }

  // Calculate and create new orbit line
  getGroundTracks({tle: satellite.tle, isLngLatFormat: false})
  .then(function (orbits) {
    console.log(orbits);
    const orbitPositions = calculateOrbit(satellite, orbits[1]);
    currentOrbitLine = createOrbitLine(orbitPositions);
    scene.add(currentOrbitLine);
  });
  // const orbitPositions = calculateOrbit(satellite);
}

function updateSatelliteInfoPanel(satellite) {
  document.getElementById("name").innerText = satellite.satName;
  document.getElementById("lat").innerText = satellite.lat;
  document.getElementById("lng").innerText = satellite.lng;
  document.getElementById("height").innerText = satellite.height;
  document.getElementById("velocity").innerText = satellite.velocity;
}

function hideSuggestions() {
  const suggestionTimeout = setTimeout(() => {
    console.log("Unfocussed");
    document.getElementById("suggestions").style.display = "none";
  }, 200); // Adjust the delay time as needed
  // document.getElementById("suggestions").style.visibility = "hidden";
}

function showSuggestions() {
  console.log("Focussed");
  document.getElementById("suggestions").style.display = "block";
}

function filterSatellites(event) {
  const keyword = event.target.value.toUpperCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";
  document.getElementById("suggestions").style.display = "block";
  document.getElementById("suggestions").style.height = "fit-content";
  document.getElementById("suggestions").style.padding = "10px";
  document.getElementById("suggestions").style.paddingBottom = "40px";

  satellites.forEach((selectedSatellite) => {
    if (selectedSatellite.satName.toUpperCase().includes(keyword)) {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");
      itemDiv.textContent = selectedSatellite.satName;
      suggestions.appendChild(itemDiv);

      // Event listener for suggestion item click
      itemDiv.addEventListener("click", function () {
        // Change color of corresponding satellite
        setActiveSat(selectedSatellite);
      });
    }
  });
}

function updateAllSatellites() {
  satellites.forEach((satellite) => satellite.updateSatellite());
}

function updateActiveSatellite() {
  if (activeSatellite != null) {
    activeSatellite.updateSatellite();
    updateSatelliteInfoPanel(activeSatellite);

    if (focussed) {
      camera.lookAt(
        activeSatellite.position[0] + 20,
        activeSatellite.position[1] + 20,
        activeSatellite.position[2] + 20
      );
      controls.target.set(...activeSatellite.position);
    }
  }
}

function calculateOrbit(satellite, orbit) {
  const positions = [];
  for(var i = 0; i < orbit.length; i++) {
    var position = calcPosFromLatLonRad(
      orbit[i][0],
      orbit[i][1],
      radius + satellite.height * scale
    );
    positions.push(new THREE.Vector3(
      position[0],
      position[1],
      position[2]
    ));
  }
  
  return positions;
}

function createOrbitLine(positions) {
  const geometry = new THREE.BufferGeometry().setFromPoints(positions);
  const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  return new THREE.Line(geometry, material);
}

function handleWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
