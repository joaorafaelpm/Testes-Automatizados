/// <reference types="cypress" />
describe("Traversing DOM elements in Cypress", () => {
  beforeEach(() => {
    cy.visit("http://webdriveruniversity.com/");
    cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
  });

  it("children() to get the children of DOM elements", () => {
    // The command "children()" is used to get the children of DOM elements. It returns a new set of DOM elements that are the children of the original set of elements.
    // In this example we are getting the children from the class "traversal-breadcrumb" and then we are asserting that the child with the class "active" and contains the text "Contact Us".
    cy.get(".traversal-breadcrumb").children(".active").should("contain", "Contact Us");
  });

  it("closest() to validate the closest ancestor DOM element", () => {
    // The command "closest()" is used to validate the closest ancestor DOM element. It returns a new set of DOM elements that are the closest ancestors of the original set of elements.
    // In this example we are getting the closest ancestor of the class "traversal-badge" (which is an unordered list) and then we are asserting that the closest ancestor is a "ul" element and has the class "list-group".
    cy.get(".traversal-badge").closest("ul").should("have.class", "list-group");
  });

  it("eq() to retrieve a specific element based on index", () => {
    // The command "eq()" is used to retrieve a specific element based on index. It returns a new set of DOM elements that are the element at the specified index in the original set of elements.
    // In this example we are getting all the children of the class "traversal-drinks-list" and then we are asserting that the element at index 2 (using the command "eq(2)") contains the text "Milk".
    cy.get(".traversal-drinks-list > *").eq(2).should("contain", "Milk");
  });

  it("filter() to retrieve DOM elements that match a specific selector", () => {
    // The command "filter()" is used to retrieve DOM elements that match a specific selector. It returns a new set of DOM elements that are the elements in the original set of elements that match the specified selector.
    // In this example we are getting all the children of the class "btn-group-toggle" and then we are asserting that the child with the class "active" contains the text "Button-1".
    cy.get(".btn-group-toggle > *").filter(".active").should("contain", "Button-1");
  });

  it("find() to retrieve DOM elements of a given selector", () => {
    // The command "find()" is used to retrieve DOM elements of a given selector. It returns a new set of DOM elements that are the descendants of the original set of elements that match the specified selector.
    // In this example we are getting the element with the class "traversal-pagination" and then we are finding all the "li" elements that are descendants of it and then we are finding all the "a" elements that are descendants of the "li" elements and then we are asserting that there are 7 "a" elements.
    cy.get(".traversal-pagination")
      .find("li")
      .find("a")
      .should("have.length", 7);
  });

  it("first() to retrieve the first DOM element within elements ", () => {
    // The command "first()" is used to retrieve the first DOM element within elements. It returns a new set of DOM elements that are the first element in the original set of elements.
    // In this example we are getting all the "td" elements that are descendants of the "tr" elements that are descendants of the "tbody" element that is a descendant of the element with the class "traversal-table" and then we are asserting that the first "td" element contains the text "Andy".
    cy.get(".traversal-table > tbody > tr > td")
      .first()
      .should("contain", "Andy");
  });

  it("last() to retrieve the last DOM element within elements", () => {
    // The command "last()" is used to retrieve the last DOM element within elements. It returns a new set of DOM elements that are the last element in the original set of elements.
    // In this example we are getting all the "td" elements that are descendants of the "tr" elements that are descendants of the "tbody" element that is a descendant of the element with the class "traversal-table" and then we are asserting that the last "td" element contains the text "Scott".
    cy.get(".traversal-table > tbody > tr > td")
      .last()
      .should("contain", "Scott");
  });

  it("nextAll() to get all of the next sibling DOM elements within elements", () => {
    // The command "nextAll()" is used to get all of the next sibling DOM elements within elements. It returns a new set of DOM elements that are the next siblings of the original set of elements.
    // In this example we are getting the element with the class "traversal-drinks-list" and then we are finding the element that contains the text "Tea" and then we are getting all the next siblings of that element and then we are asserting that there are 3 next siblings.
    cy.get(".traversal-drinks-list")
      .contains("Tea")
      .nextAll()
      .should("have.length", "3");
  });

  it("nextUntil() to get all of the next sibling DOM elements within elements until another element", () => {
    // The command "nextUntil()" is used to get all of the next sibling DOM elements within elements until another element. It returns a new set of DOM elements that are the next siblings of the original set of elements until the specified element is reached.
    // In this example we are getting the element with the id "coffee" and then we are getting all the next siblings of that element until we reach the element with the id "milk" and then we are asserting that there is 1 next sibling between those two elements.
    cy.get("#coffee").nextUntil("#milk").should("have.length", "1");
  });

  it("not() to remove DOM element(s) from the set of elements", () => {
    // The command "not()" is used to remove DOM element(s) from the set of elements. It returns a new set of DOM elements that are the elements in the original set of elements that do not match the specified selector.
    // In this example we are getting all the "button" elements that are children of the element with the class "traversal-button-states" and then we are removing the "button" elements that have the class "disabled" and then we are asserting that the remaining "button" elements do not have the class "disabled".
    cy.get(".traversal-button-states > button").not(".disabled").should("not.have.class", "disabled");
  });

  it("parent() To get parent DOM element of elements", () => {
    // The command "parent()" is used to get the parent DOM element of elements. It returns a new set of DOM elements that are the parent of the original set of elements.
    // In this example we are getting the element with the class "traversal-mark" and then we are getting its parent element and then we are asserting that the parent element contains the text "Lorem ipsum dolor sit amet".
    cy.get(".traversal-mark").parent().should("contain", "Lorem ipsum dolor sit amet");
  });

  it("parents() to get parents DOM element of elements", () => {
    // The command "parents()" is used to get the parents DOM element of elements. It returns a new set of DOM elements that are the parents of the original set of elements.
    // In this example we are getting the element with the class "traversal-citie" and then we are getting all its parent elements and then we are asserting that one of the parent elements is a "blockquote" element.
    cy.get(".traversal-cite").parents().should("match", "blockquote");
  });

  it("prev() to get the previous sibling DOM element within elements", () => {
    // The command "prev()" is used to get the previous sibling DOM element within elements. It returns a new set of DOM elements that are the previous sibling of the original set of elements.
    // In this example we are getting the element with the id "sugar" and then we are getting its previous sibling element and then we are asserting that the previous sibling element contains the text "Espresso".
    cy.get("#sugar").prev().should("contain", "Espresso");
  });

  it("prevAll() to get all previous sibling DOM elements within elements", () => {
    // The command "prevAll()" is used to get all previous sibling DOM elements within elements. It returns a new set of DOM elements that are the previous siblings of the original set of elements.
    // In this example we are getting the element with the class "sales" and then we are getting all its previous sibling elements and then we are asserting that there are 2 previous sibling elements.
    cy.get(".sales").prevAll().should("have.length", "2");
  });

  it("prevUntil() to get all previous sibling DOM elements within elements until other element", () => {
    // The command "prevUntil()" is used to get all previous sibling DOM elements within elements until other element. It returns a new set of DOM elements that are the previous siblings of the original set of elements until the specified element is reached.
    // In this example we are getting the element with the id "veggie" and then we are getting all its previous sibling elements until we reach the element with the id "fruits" and then we are asserting that there are 2 previous sibling elements between those two elements.
    cy.get("#veggie").prevUntil("#fruits").should("have.length", "5");
  });

  it("siblings() To get all sibling DOM elements of elements", () => {
    // The command "siblings()" is used to get all sibling DOM elements of elements. It returns a new set of DOM elements that are the siblings of the original set of elements.
    // In this example we are getting the element with the class "traversal-button-other-states" and then we are getting all its sibling elements and then we are asserting that there are 3 sibling elements.
    cy.get(".traversal-button-other-states .active")
      .siblings()
      .should("have.length", "3");
  });
});
