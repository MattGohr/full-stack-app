$(document).ready(function () {
  // Getting references to the name inout and author container, as well as the table body
  var burgerInput = $("#burger-input");
  var burgerList = $("");
  var uneatenList = $("#uneaten-list");
  var eatenList = $("#uneaten-list");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Burger
  $(document).on("submit", "#burger-form", handleBurgerFormSubmit);
  $(document).on("click", ".delete-burgerBtn", handleDeleteButtonPress);
  $(document).on("click", ".eat-burgerBtn", handleDevouredButtonPress);
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
    var newLi = $(`<li>`);
    newLi.attr("id", id+1);
    newLi.append(`${id+1}. ${burgerData.burger_name} Burger`);
    newLi.append(`<button class='delete-burgerBtn btn btn-danger'>Delete Burger</button>`);
    newLi.append(`<button class='eat-burgerBtn btn btn-secondary'>Eat Burger</button>`);    
    return newLi;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getBurgers() {
    $.get("/api/burgers", function (data) {
      $("#uneaten-list").empty();
      $("#eaten-list").empty();
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createBurgerRow(data[i], i));
      }
      renderBurgerList(rowsToAdd);
      burgerInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderBurgerList(rows) {
    uneatenList.append(rows);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("li");
    var id = listItemData.attr("id");
    console.log(`id is: ${id}`);
    console.log(listItemData);
    
    $.ajax({
        method: "DELETE",
        url: "/api/burgers/" + id
      })
      .then(function(){
        getBurgers();
      });
  }
  function handleDevouredButtonPress() {
    var listItemData = $(this).parent("li");
    var id = listItemData.attr("id");
    console.log(`id is: ${id}`);
    console.log(listItemData);
    
    var burgerState = {
      devoured: true
    }

    $.ajax({
        method: "PUT",
        url: "/api/burgers/" + id,
        data: burgerState
      })
      .then(function(){
        getBurgers();
      });
  }
});