// setTimeout(() => {
//   $("#loader").fadeOut("slow");

// }, 2000);
$(this).on("keydown click", () => {
  $("#loader").fadeOut("slow");
  $(".welcome").addClass("animate__animated animate__fadeInDownBig");
  $("table button").addClass("animate__animated animate__zoomIn");
  $("header img").addClass("animate__animated animate__zoomIn");
  $("section .export-pdf-button").addClass("animate__animated animate__fadeInLeftBig");
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
    table.innerHTML += `<span class="task-box">${
      clothName.value == "" ? "Undefind" : clothName.value
    } _ ${clothColor.value == "" ? "Undefind" : clothColor.value}</span><br />`;

    // if (clothName.value == "") {
    //   clothName.parentNode.innerHTML += `<span class="text text-danger" style="position: absolute;font-size:20px">please insert cloth name</span>`;
    //   // return;
    // }
    // if (clothColor.value == "") {
    //   clothColor.parentNode.innerHTML += `<span class="text text-danger" style="position: absolute;font-size:20px">please insert cloth color</span>`;
    // }

    // return;
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
        console.log(div);
        // });
      }
      let x = $('#output #example thead th')
        x.each(i => {
            if (x[i].children[1] == undefined) {
    
            } else {
                x[i].children[1].classList.add('hide')
                console.log(x[i].children[1].classList);
            }
        })
      
      // $('table thead th button').each(x => {
      //     $('table thead th button')[x].classList.remove('hide')
      // })
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
