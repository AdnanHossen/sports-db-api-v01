// get team data
const getTeamData = () => {
  const fieldValue = document.getElementById("search-field");
  const fieldInput = fieldValue.value;
  const updateResult = document.getElementById("display-result");
  document.getElementById("spinner-loader").classList.remove("d-none");

  if (fieldInput.length == 0) {
    document.getElementById("error-message").classList.remove("d-none");
  } else {
    fetchData(fieldInput);
    document.getElementById("error-message").classList.add("d-none");
    updateResult.textContent = "";
  }
  fieldValue.value = "";
};

// fetch the url
const fetchData = (team) => {
  console.log(team);
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayResult(data.teams))
    .catch((error) => displayError(error));
};

// show error message
const displayError = (error) => {
  document.getElementById("spinner-loader").classList.add("d-none");
  document.getElementById("error-message").classList.remove("d-none");
};

// display search result
const displayResult = (results) => {
  document.getElementById("spinner-loader").classList.add("d-none");
  const updateResult = document.getElementById("display-result");
  results.forEach((team) => {
    console.log(team);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
      <img src="${
        team.strTeamBadge
      }" class="card-img-top w-50 mx-auto p-4" alt="..." />
      <div class="card-body bg-dark text-white p-4">
        <h5 class="card-title fw-bolder">${team.strAlternate}</h5>
        <h6 class="text-muted">${team.strLeague}</h6>
        <p class="card-text">
          ${team.strDescriptionEN.slice(0, 100)}
        </p>
      </div>
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Details
      </button>

      <!-- Modal -->
      <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
      <div class="modal-content bg-dark text-white">
      <div class="modal-header">
        <h4 class="modal-title" id="staticBackdropLabel">${
          team.strAlternate
        }</h4>
        <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        <h6 class="fw-bolder ">Country: ${team.strCountry}</h6>
        <h6 class="fw-bolder ">Founded: ${team.intFormedYear}</h6>
        <h6 class="fw-bolder ">Stadium: ${team.strStadium}</h6>
        <h6 class="fw-bolder ">Capacity: ${team.intStadiumCapacity}</h6>
        <h6 class="fw-bolder ">Short-History:
        <p class="fs-6 my-4 text-muted fw-bold">${team.strDescriptionEN}</p>  
        </h6>

        <h6 class="fw-bolder">
        Follow:
        <span>
        <a href="https://${
          team.strTwitter
        }" target="_blank" class="text-decoration-none text-white"><i class="fab fa-twitter mx-2"></i></a>
        </span>

        <span>
        <a href="https://${
          team.strInstagram
        }" target="_blank" class="text-decoration-none text-white"><i class="fab fa-instagram"></i></a>        
        </span>
        </h6>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
      </div>
      </div>
      </div>
    </div>
    `;
    updateResult.appendChild(div);
  });
};
