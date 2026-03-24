
const tabs = ["Habits","Meals","ToDo","Review","Identity"];

const pagesEl = document.getElementById("pages");
const tabsEl = document.getElementById("tabs");

let state = {
  habits: JSON.parse(localStorage.getItem("habits")||"[]"),
  todos
