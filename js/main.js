// setTimeout(() => {
//   $("#loader").fadeOut("slow");

// }, 2000);
$(this).on("keydown click", () => {
  $("#loader").fadeOut("slow");
  $(".welcome").addClass("animate__animated animate__fadeInDownBig");
  $("table button").addClass("animate__animated animate__zoomIn");
  $("header img").addClass("animate__animated animate__zoomIn");
  $("section .export-pdf-button").addClass(
    "animate__animated animate__fadeInLeftBig"
  );
});

function openModel(type, e) {
  document.getElementById("modal-wrapper").innerHTML += getModal(type);
  $("#clothName").focus();
}

function closeModal() {
  document.getElementById("modal-wrapper").innerHTML = "";
}

function addItem(type, event) {
  event.preventDefault();

  const clothName = document.getElementById("clothName");
  const clothColor = document.getElementById("clothColor");
  const clothType = document.getElementById("clothType");

  const targetCategory = document.getElementById(clothType.value);
  const table = targetCategory.getElementsByClassName(type)[0];

  clothName.nextSibling.remove();

  if (!clothName.value == "" || !clothColor.value == "") {
    table.innerHTML += `<span class="task-box dropright">
    <span class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ${clothName.value} _ ${clothColor.value}</span>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="min-width: 0px;">
      <span class="button text-danger delete fa fa-trash-o mr-2 ml-2" onclick="deleteFunc(this)" id="deleteItem"></span>
      <span class="button text-dark edit fa fa-pencil-square-o mr-2" onclick="editFunc(this, '${clothName.value}','${clothColor.value}','${clothType.value}','${type}')"></span>
    </div>
    <br /></span>`;
  }

  document.getElementById("modal-wrapper").innerHTML = "";
}

// Define the function
// to screenshot the div
function takeshot() {
  let div = document.getElementById("example").cloneNode(true);
  // Use the html2canvas
  // function to take a screenshot
  // and append it
  // to the output div
  $("#output").children().remove();
  setTimeout(() => {
    if ($("#output").parent().parent().parent().hasClass("show")) {
      // html2canvas(div).then(function (canvas) {
      document.getElementById("output").append(div);
      // });
    }
    let x = $("#output #example button, #output #example .button");
    x.each((i) => {
      x[i].classList.add("hide");
    });
    // let aftr = $("#output #example .dropright .dropdown-toggle::after");
    // aftr.each((i) => {
    //   aftr[i].remove();
    // });
  }, 200);
}

function downloadPdf() {
  var canvas = document.querySelector("canvas");
  image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  var link = document.createElement("a");
  link.download = "my-image.png";
  link.href = image;
  link.click();
  // $("#organizer").tableHTMLExport({ type: "pdf", filename: "organizer.pdf" });
}

function getModal(type) {
  return `<div id="custom-model-main" class="custom-model-main model-open">
<div class="container">
  <div class="row">
    <div class="col-12 col-md-8">
      <div class="custom-model-inner">
        <div class="custom-model-wrap">
          <div class="pop-up-content-wrap">
            <div class="items">
              <div class="adding row">
                <div class="add col-6">Add Item</div>
                <div class="close col-6" onclick="closeModal()">×</div>
              </div>
              <form onsubmit="addItem( '  ${type}  ', event)">
                <div class="input-ele row">
                  <div class="mb-3 col-lg-6">
                    <label
                      for="staticEmail"
                      class=" col-form-label"
                      >Clothe Name</label
                    >
                    <input
                      id="clothName"
                      type="text"
                      class="form-control"
                      min="1"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <label
                      for="inputPassword"
                      class=" col-form-label"
                      >Clothe Color</label
                    >
                    <input
                      id="clothColor"
                      type="text"
                      class="form-control"
                      min="1"
                    />
                  </div>
                  <div class="mb-4  col-lg-12">
                    <label
                      class=" col-form-label"
                      >Cloth type</label
                    >
                      <select
                        id="clothType"
                        class="form-control"
                      >
                      <option value="workware">Workware</option>
                      <option value="home">Home</option>
                      <option value="sport">Sport</option>
                      <option value="partyware">Partyware</option>
                      </select>

                  </div>
                </div>
                <button
                  id="saveData"
                  class="btn btn-primary text-center submit"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="bg-overlay"  onclick="closeModal()"></div>
</div>`;
}

// function edit(e) {
//   e.children[1].classList.toggle("hide");
//   e.children[1].classList.toggle("animate__zoomIn");
//   e.children[2].classList.toggle("hide");
//   e.children[2].classList.toggle("animate__zoomIn");
// }

// delete function

function deleteFunc(elem) {
  let t = elem.parentNode.parentNode;
  t.parentNode.removeChild(t);
}

//  edit function

function editFunc(elem, x, y, z, type) {
  openModel(type);

  clothName.value = x;
  clothColor.value = y;
  clothType.value = z;

  let t = elem.parentNode.parentNode;
  t.parentNode.removeChild(t);
}
