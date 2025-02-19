const elementDisplayFilesName = document.querySelector("#displayFilesName");
elementDisplayFilesName.classList.add("hidden");
const elementDisplaySectionsName = document.querySelector("#displaySectionsName");
const elementDisplaySettings = document.querySelector("#settings");
elementDisplaySettings.classList.add("hidden");
const elementType1Container = document.querySelector("#type1-container");
elementType1Container.classList.add("hidden");
const elementType2Container = document.querySelector("#type2-container");
elementType2Container.classList.add("hidden");

//przesunięcie przy odświerzeniu
document.querySelector("body").scrollIntoView({
  behavior: "smooth",
  block: "start",
});

//grupy odmian
displaySpeciesGroup(elementDisplaySectionsName);

names_section.forEach((section, index) => {
  //gdy klikniesz na grupę:
  document.getElementById(`section-${index}`).addEventListener("click", function () {
    if (section !== "reszta wkrótce") {
      displaySpecies(elementDisplayFilesName, false);

      functioningSpecies();
    }
  });
});

function displayFilters(file) {
  elementDisplaySettings.classList.remove("hidden");

  //dodanie filtru 'typ1'
  if (arrays[file.replace(".json", "") + "_type1"]) {
    const elementType1 = document.querySelector("#type1");
    elementType1Container.classList.remove("hidden");
    document.querySelector("#type1-name").innerHTML = arrays[file.replace(".json", "") + "_type1_name"];
    let types1 = '<option value="-">wszystkie</option>';
    for (type of arrays[file.replace(".json", "") + "_type1"]) {
      types1 += `<option value="${type}">${type}</option>`;
    }
    elementType1.innerHTML = types1;

    elementType1.addEventListener("change", () => {
      let selectedType1 = elementType1.value;
      if (selectedType1 !== "-") {
        table.columns(8).search(selectedType1).draw();
      } else {
        table.columns(8).search("").draw();
      }
    });
  }
  //dodanie filtru 'typ2'
  if (arrays[file.replace(".json", "") + "_type2"]) {
    const elementType2 = document.querySelector("#type2");
    document.querySelector("#type2-name").innerHTML = arrays[file.replace(".json", "") + "_type2_name"];
    elementType2Container.classList.remove("hidden");
    let types2 = '<option value="-">wszystkie</option>';
    for (type of arrays[file.replace(".json", "") + "_type2"]) {
      types2 += `<option value="${type}">${type}</option>`;
    }
    elementType2.innerHTML = types2;

    elementType2.addEventListener("change", () => {
      let selectedType2 = elementType2.value;
      if (selectedType2 !== "-") {
        table.columns(10).search(selectedType2).draw();
      } else {
        table.columns(10).search("").draw();
      }
    });
  }

  //dodanie filtru 'rok'
  let years = "";
  const elementYearFilter = document.querySelector("#yearFilter");
  for (year of arrays[file.replace(".json", "") + "_year"]) {
    years += `<option value="${year}">${year}</option>`;
  }
  elementYearFilter.innerHTML = years;

  const selectedYear = elementYearFilter.value;
  table.columns(1).search(selectedYear).draw();

  elementYearFilter.addEventListener("change", () => {
    const selectedYear = elementYearFilter.value;
    table.columns(1).search(selectedYear).draw();
    table.columns(8).search(selectedType1).draw();
    table.columns(10).search(selectedType2).draw();
  });

  //dodanie sortowarki
  let sort = "";
  const elementSorting = document.querySelector("#sorting");
  for (element of arrays[file.replace(".json", "") + "_col_names"].slice(0, -17)) {
    if (element !== "Rok wyników:") {
      sort += `<option value="${element.replace(":", "")}">${element.replace(":", "")}</option>`;
    }
  }
  elementSorting.innerHTML = sort;

  elementSorting.addEventListener("change", (event) => {
    let sortingIndex = arrays[file.replace(".json", "") + "_col_names"].slice(0, -17).indexOf(event.target.value + ":");

    if (sortingIndex !== -1) {
      displayFilesValues(file, -1, "Brak wyników dla podanych ustawień", sortingIndex, false);
      table.columns(1).search(elementYearFilter.value).draw();

      if (sortingIndex === 0) {
        table.order([sortingIndex, "asc"]).draw();
      } else {
        table.order([sortingIndex, "desc"]).draw();
      }
    }

    //przesunięcie
    document.querySelector("#settings").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
