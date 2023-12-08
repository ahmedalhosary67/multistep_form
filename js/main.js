//your javascript goes here
var currentTab = 0;
var results = {};

document.addEventListener("DOMContentLoaded", function (event) {
  showTab(currentTab);
});

$(".input_field").on("change", function (e) {
  results[e.target.name] = e.target.value;
  $(this).parent().addClass("completed");
});
$(".sportsyes").on("click", function (e) {
  $(".sportchoises").removeClass("disabled");
  // results[e.target.name] = e.target.value;
});

$(".option").on("click", function (e) {
  if (this.classList.contains("optionBox2")) {
    let optionParent = this.parentElement;
    $(optionParent).find(".option").removeClass("active");
    this.classList.add("active");
  }
  if (
    e.target.name ||
    $(this).attr("name") ||
    e.target.value ||
    $(this).attr("value")
  ) {
    if (e.target.name === "howtraining" || e.target.name === "duration") {
      if (e.target.checked) {
        results[e.target.name] = `${results[e.target.name]} - ${
          e.target.value
        }`;
        $(this).parent().addClass("completed");
      } else {
        results[e.target.name] = results[e.target.name]
          .split(" - ")
          .filter((el) => el !== e.target.value)
          .join(" - ");
      }
    } else if ($(this).attr("name") === "sport") {
      if ($(this).attr("value") === "نعم") {
        $(".sportchoises").removeClass("disabled");
        results[$(this).attr("name")] = undefined;
        $(this).parent().removeClass("completed");
      } else {
        $(".sportchoises").addClass("disabled");
        results[$(this).attr("name")] = $(this).attr("value");
        $(this).parent().addClass("completed");
      }
    } else if ($(this).attr("name") === "contraindecations") {
      if ($(this).attr("value") === "غير ذلك") {
        $(this).parent().find(".input_field").removeClass("disabled");
        results[$(this).attr("name")] = undefined;
        $(this).parent().removeClass("completed");
      } else {
        $(this).parent().find(".input_field").addClass("disabled");
        results[$(this).attr("name")] = $(this).attr("value");
        $(this).parent().addClass("completed");
      }
    } else {
      results[e.target.name || $(this).attr("name")] =
        e.target.value || $(this).attr("value");
      $(this).parent().addClass("completed");
    }
    console.log(results);
  }
});

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "تقدم الآن";
    // document.getElementById("nextBtn").setAttribute("type", "submit");
  } else {
    document.getElementById("nextBtn").innerHTML = "التالي";
  }
  // fixStepIndicator(n)
}

function submit() {
  // e.preventDefault();
  console.log(results);
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    submit();
    // document.getElementById("regForm").submit();

    // return false;
    // alert("sdf");
    document.getElementById("nextprevious").style.display = "none";
    // document.getElementById("all-steps").style.display = "none";
    // document.getElementById("register").style.display = "none";
    document.getElementById("text-message").style.display = "block";
  }
  showTab(currentTab);
}

function validateForm() {
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  z = x[currentTab].getElementsByClassName("options");
  for (i = 0; i < z.length; i++) {
    console.log($(z[i]));
    // console.log(results[z[i].getAttribute("name")]);
    if (!$(z[i]).hasClass("completed")) {
      z[i].className += " invalid";
      valid = false;
    }
  }
  for (i = 0; i < y.length; i++) {
    console.log(y[i].parentElement.classList.contains("disabled"));
    if (y[i].parentElement.classList.contains("disabled")) {
      return valid;
    }
    if (y[i].value == "") {
      $(y[i]).parent().find(".valid-feedback").addClass("invalid");
      valid = false;
    }
  }
  // if (valid) { document.getElementsByClassName("step")[currentTab].className += " finish"; }
  return valid;
}

// function fixStepIndicator(n) {
//     var i, x = document.getElementsByClassName("step");
//     for (i = 0; i < x.length; i++) { x[i].className = x[i].className.replace(" active", ""); }
//     x[n].className += " active";
// }
