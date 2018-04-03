$(document).ready(function () {
  // Getting references to the name inout and author container, as well as the table body
  var burgerInput = $("#burger-input");
  var burgerList = $("");
  var uneatenContainer = $("#uneaten-list");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Burger
  $(document).on("submit", "#burger-form", handleBurgerFormSubmit);
  $(document).on("click", ".delete-burger", handleDeleteButtonPress);

  // Getting the intiial list of Burgers
  getBurgers();

  // A function to handle what happens when the form is submitted to create a new Burger
  function handleBurgerFormSubmit(event) {
    event.preventDefault();
    console.log(`submit form`);

    // Don't do anything if the name fields hasn't been filled out
    if (!burgerInput.val().trim()) {
      return;
    }
    // Calling the upsertBurger function and passing in the value of the name input
    upsertBurger({
      burger_name: burgerInput.val().trim(),
      devoured: 0
    })
  }

  // A function for creating an author. Calls getBurgers upon completion
  function upsertBurger(burgerData) {
    console.log(burgerData);

    $.post("/api/burgers", burgerData)
      .then(function () {
        getBurgers();
        $("#burger-input").val("")

      });
  }

  // Function for creating a new list row for authors
  function createBurgerRow(burgerData, id) {
    var newLi = $(`<li> ${id} ${burgerData.burger_name}`);
    newLi.data("burger", burgerData);
    // newLi.append(id);
    // newLi.append(burgerData.burger_name);
    newLi.append("<button>class='delete-burger'>Delete Burger</a></button>");
    return newLi;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getBurgers() {
    $.get("/api/burgers", function (data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createBurgerRow(data[i], i));
        console.log(data[i]);
      }
      console.log(rowsToAdd);
      renderBurgerList(rowsToAdd);
      burgerInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderBurgerList(rows) {
    console.log(rows);
    // burgerList.prepend(rows);
    uneatenContainer.append(rows);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;
    $.ajax({
        method: "DELETE",
        url: "/api/burgers/" + id
      })
      .then(getBurgers);
  }
});