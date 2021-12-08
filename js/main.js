//-------------------------------1

const createElemWithText = (element, textContent, className) => {
  let tag = "";

  if (element === "" || !element) {
    tag = document.createElement("p");
  } else {
    tag = document.createElement(`${element}`);
  }

  if (textContent === "" || !textContent) {
    tag.innerText = "";
  } else {
    tag.innerText = `${textContent}`;
  }

  if (className) {
    tag.classList.add(`${className}`);
  }

  return tag;
};

//-----------------------------------2

const createSelectOptions = async jasonDataURL => {
  if (!jasonDataURL) return;

  const resultArray = [];

  const jsonData = await jasonDataURL;

  for (let i = 0; i < jsonData.length; i++) {
    const id = jsonData[i].id;
    const name = jsonData[i].name;

    const optionElem = document.createElement("option");
    optionElem.value = id;
    optionElem.textContent = name;

    resultArray.push(optionElem);
  }

  return resultArray;
};

// ----------------------------------3

const toggleCommentSection = postId => {
  if (!postId || postId === null) {
    return;
  }

  if (postId) {
    const elemSection = document.querySelector(
      `section[data-post-id="${postId}"]`
    );

    if (elemSection) {
      elemSection.classList.toggle("hide");
    }

    return elemSection;
  }
};

//---------------------------------------4

const toggleCommentButton = postId => {
  if (!postId) {
    return;
  }

  if (postId) {
    let button = document.querySelector(`button[data-post-id="${postId}"]`);

    if (button) {
      let buttonText = document.querySelector(
        `button[data-post-id="${postId}"]`
      ).textContent;

      buttonText = buttonText.replace(/(\r\n|\n|\r)/gm, "");

      buttonText = buttonText.trim();

      buttonText === "Show Comments"
        ? (button.textContent = "Hide Comments")
        : (button.textContent = "Show Comments");

      return button;
    }
  }
};

//----------------------------------5

const deleteChildElements = parentElement => {
  if (!parentElement) return;

  if (typeof parentElement == "undefined") return;

  // const parentElement = document.getElementById("searchResults");

  let child = parentElement.lastElementChild;

  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }

  return parentElement;
};

//-----------------------------------------6

const addButtonListeners = () => {
  const buttons = document.querySelectorAll("main button");

  if (buttons) {
    for (let i = 0; i < buttons.length; i++) {
      const id = i;
      const postId = buttons[i].dataset.postId;

      const postIdNumber = {
        postId: postId
      };

      buttons[i].addEventListener(
        "click",
        function(e) {
          toggleComments(e, postId);
        },
        false
      );
    }
  }

  return buttons;
};

//--------------------------------------------7

const removeButtonListeners = () => {
  const buttons = document.querySelectorAll("main button");

  if (buttons) {
    Object.keys(buttons).forEach(key => {
      const id = key;
      const postId = buttons[key].dataset.postId;

      const postIdNumber = {
        postId: postId
      };

      //  console.log(postIdNumber);  // TEST

      buttons[key].removeEventListener(
        "click",
        toggleComments("click", postIdNumber)
      );
    });
  }

  return buttons;
};

//--------------------------------------8

const createComments = async jsonComments => {
  if (!jsonComments) return;

  const Comments = await jsonComments;

  const fragment = document.createDocumentFragment();

  Object.keys(Comments).forEach(key => {
    const id = key;
    const name = Comments.name;
    const body = Comments.body;
    const email = Comments.email;

    const article = document.createElement("article");

    const h3 = createElemWithText("h3", `${name}`);
    const p1 = createElemWithText("p", `${body}`);
    const p2 = createElemWithText("p", `From:${email}`);

    article.append(h3);
    article.append(p1);
    article.append(p2);

    fragment.append(article);
  });

  return fragment;
};

//---------------------------------9

const populateSelectMenu = async jasonData => {
  if (!jasonData || jasonData === "") {
    return;
  } else {
    let resultArray = [];

    const jsonData = await jasonData;

    let selectMenu = document.getElementById("selectMenu");

    const returnedData = await createSelectOptions(jsonData);

    for (let item in returnedData) {
      resultArray.push(returnedData[item]);
    }

    for (let i = 0; i < resultArray.length; i++) {
      selectMenu.append(resultArray[i]);
    }

    return selectMenu;
  }
};

//----------------------------------10

const getUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonUsertData = await response.json();
    return jsonUsertData;
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

//-------------------------------11

const getUserPosts = async userID => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userID}/posts`
    );
    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

//-----------------------------------------12

const getUser = async userID => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userID}`
    );
    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

//--------------------------------13

const getPostComments = async postID => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${postID}`
    );
    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

//------------------------------------------------14

const displayComments = async postId => {
  if (!postId || postId === "") {
    return;
  } else {
    const sectionElem = document.createElement("section");

    const jsonData = await postId;

    let comments = getPostComments(postId);

    let fragment = await createComments(comments);

    sectionElem.dataset.postId = postId;

    sectionElem.classList.add("comments");
    sectionElem.classList.add("hide");

    sectionElem.append(fragment);

    return sectionElem;
  }
};

//--------------------------------------15

const createPosts = async PostsData => {
  if (!PostsData) return;

  if (PostsData) {
    const posts = await PostsData;

    const fragment = document.createDocumentFragment();
    const article = document.createElement("article");

    for (let i = 1; i < posts.length; i++) {
      const k = i;
      const title = posts[i].title;
      const body = posts[i].body;
      const id = posts[i].id;
      const userId = posts[i].userId;

      const h2 = createElemWithText("h2", `${title}`);
      const p1 = createElemWithText("p", `${body}`);
      const p2 = createElemWithText("p", `${id}`);

      const author = await getUser(userId);

      const p3 = createElemWithText(
        "p",
        `Author: ${author.name} with ${author.company.name}`
      );
      const p4 = createElemWithText(
        "p",
        `Company Catch Phrase: ${author.company.catchPhrase}`
      );
      const button = createElemWithText("button", "Show Comments");

      button.dataset.postId = id;

      article.append(h2);
      article.append(p1);
      article.append(p2);
      article.append(p3);
      article.append(p4);
      article.append(button);

      const section = await displayComments(id);

      article.append(section);
    }

    fragment.append(article);

    return fragment;
  }
};

//-----------------------------------------16

const displayPosts = async postsData => {
  if (!postsData) return;

  const mainElem = document.querySelector("main");

  const element = postsData
    ? await createPosts(postsData)
    : createElemWithText("p", "Posts not available", "default-text");

  mainElem.append(element);

  return element;
};

//----------------------------------------17

const toggleComments = (event, postId) => {
  let userId = event?.target?.value || 1;

  let result = [];

  const section = toggleCommentSection(postId);

  const button = toggleCommentButton(postId);

  return (result = [section, button]);
};

//--------------------------------------18

const refreshPosts = async postsData => {
  if (postsData) {
    let resultArray = [];

    const removeButtons = removeButtonListeners();
    const main = document.querySelector("main");
    const returnedMain = deleteChildElements(main);

    const fragment = await displayPosts(postsData);
    const addButtons = addButtonListeners();

    resultArray.push(removeButtons);
    resultArray.push(returnedMain);
    resultArray.push(fragment);
    resultArray.push(addButtons);

    return resultArray;
  }
};

//------------------------------------------19

const selectMenuChangeEventHandler = async event => {
  let resultArray = [];

  let refreshPostsArray = [];

  let userId = event?.target?.value || 1;

  const posts = await getUserPosts(userId);

  refreshPostsArray = await refreshPosts(posts);

  resultArray.push(userId);
  resultArray.push(posts);
  resultArray.push(refreshPostsArray);

  return resultArray;
};

//--------------------------------------------------19

const initPage = async () => {
  let resultArray = [];

  const users = await getUsers();

  const select = await populateSelectMenu(users);

  resultArray.push(users);
  resultArray.push(select);

  return resultArray;
};

//-----------------------------------------------------20

const initApp = () => {
  initPage();
  const select = document.getElementById("selectMenu");

  select.addEventListener("change", event => {
    selectMenuChangeEventHandler(event);
  });
};

document.addEventListener("DOMContentLoaded", initApp());


