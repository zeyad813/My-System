const tabs = ["Habits","Meals","ToDo","Review","Identity"];

const pagesEl = document.getElementById("pages");
const tabsEl = document.getElementById("tabs");

let state = {
  habits: JSON.parse(localStorage.getItem("habits")||"[]"),
  todos: JSON.parse(localStorage.getItem("todos")||"[]"),
  meals: {
    A: localStorage.getItem("mealA") === "1",
    B: localStorage.getItem("mealB") === "1"
  }
};

// Tabs

tabs.forEach((t,i)=>{
  let b=document.createElement('button');
  b.innerText=t;
  b.onclick=()=>showPage(i);
  tabsEl.appendChild(b);

  let p=document.createElement('div');
  p.id="page"+i;
  if(i===0)p.style.display='block';
  else p.style.display='none';
  pagesEl.appendChild(p);
});

function showPage(i){
  pagesEl.childNodes.forEach((p,idx)=>{
    p.style.display = idx===i?'block':'none';
  });
}

// HABITS (FULLY CUSTOM)

function renderHabits(){
  const page = document.getElementById("page0");
  page.innerHTML="";

  state.habits.forEach((h,i)=>{
    let c=document.createElement("div");
    c.className="card";
    c.innerText=h.name;

    c.onclick=()=>{
      h.done=!h.done;
      save();
    };

    let del=document.createElement("button");
    del.innerText="X";
    del.onclick=(e)=>{
      e.stopPropagation();
      state.habits.splice(i,1);
      save();
    };

    c.appendChild(del);
    page.appendChild(c);
  });

  let add=document.createElement("button");
  add.innerText="Add Habit";
  add.onclick=()=>{
    let name=prompt("Habit name");
    if(!name)return;
    state.habits.push({name,done:false});
    save();
  };

  page.appendChild(add);
}

// MEALS

function renderMeals(){
  const page = document.getElementById("page1");
  page.innerHTML="";

  page.innerHTML = `
  <div class='card'>
  Meal A (Chicken)
  <button onclick="toggleMeal('A')">${state.meals.A?'✓':'Done'}</button>
  <details>
  Shawarma / Tomato / Garlic Butter
  </details>
  </div>

  <div class='card'>
  Meal B (4 Eggs)
  <button onclick="toggleMeal('B')">${state.meals.B?'✓':'Done'}</button>
  </div>
  `;
}

function toggleMeal(m){
  state.meals[m]=!state.meals[m];
  localStorage.setItem("meal"+m, state.meals[m]?"1":"0");
  renderMeals();
}

// TODOS

function renderTodos(){
  const page = document.getElementById("page2");
  page.innerHTML="";

  state.todos.forEach((t,i)=>{
    let c=document.createElement("div");
    c.className="card";
    c.innerText=t.label;

    let del=document.createElement("button");
    del.innerText="X";
    del.onclick=()=>{
      state.todos.splice(i,1);
      save();
    };

    c.appendChild(del);
    page.appendChild(c);
  });

  let add=document.createElement("button");
  add.innerText="Add Task";
  add.onclick=()=>{
    let label=prompt("Task");
    state.todos.push({label});
    save();
  };

  page.appendChild(add);
}

// REVIEW

function renderReview(){
  const page = document.getElementById("page3");
  page.innerHTML="";

  let btn=document.createElement("button");
  btn.innerText="Add Review";
  btn.onclick=()=>{
    let r=prompt("Rate 1-10");
    let note=prompt("Note");
    let reviews = JSON.parse(localStorage.getItem("reviews")||"[]");
    reviews.push({r,note,date:new Date().toISOString()});
    localStorage.setItem("reviews",JSON.stringify(reviews));
    renderReview();
  };

  page.appendChild(btn);
}

// IDENTITY

function renderIdentity(){
  const page = document.getElementById("page4");
  page.innerHTML = `
  <div class='card'>
  Disciplined. Focused. God-conscious.
  <br><br>
  <button onclick="alert('Wudu → 2 rakats → continue')">Reset</button>
  </div>
  `;
}

// SAVE

function save(){
  localStorage.setItem("habits",JSON.stringify(state.habits));
  localStorage.setItem("todos",JSON.stringify(state.todos));
  renderAll();
}

function renderAll(){
  renderHabits();
  renderMeals();
  renderTodos();
  renderReview();
  renderIdentity();
}

renderAll();
