// Fetching all posts from the server
fetch('http://localhost:3000/coffee')
  .then((response) => response.json())
  .then((data) => {
    console.log(data); 
    const coffee = document.getElementById("coffee");
    
    
    coffee.innerHTML = "";

    for (let post of data) {
       
        coffee.innerHTML += `
            <div class="col-md-3">
              <img src="${post.imageURL}" alt="${post.title}">
              <h4>${post.title}</h4>
              <p>${post.price}</p>
              <p>${post.amount}<p>
              <div class="fel">
                <div onclick="deletePost(${post.id})" class="delete"><i class="fa-solid fa-trash-can"></i>
                </div>
                <div>
                  <i onclick="editPost(${post.id})" class="fa-solid fa-pen-to-square"></i>
                </div>
              </div>
            </div>`;
    }})
  .catch((error) => {
    console.error('Error fetching data:', error); 
  });

  // adding a post with images 
const add_form = document.getElementById("post_form");

add_form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const image = document.getElementById("imageURL").value;
  const price = document.getElementById("price").value;
  const amount = document.getElementById("amount").value;

  console.log(title, image, price, amount);
  
  fetch('http://localhost:3000/coffee', { 
    method: 'POST',
    body: JSON.stringify({
      title: title,
      imageURL: image,
      price: price,
      amount: amount,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((res) => {
      const message = document.getElementById("prompt");
      message.innerText = "Post created successfully";
    })
    .catch((error) => {
      console.error("Error:", error);
      const message = document.getElementById("prompt");
      message.innerText = "Failed to create post";
    });
});


// deleting the post created
function deletePost(id) {
  fetch(`http://localhost:3000/coffee/${id}`, {
    method: 'DELETE',
  })
  .then((res) => res.json())
  .then((response) => {
    const del_message = document.getElementById("del_message");
    del_message.innerText = "Post deleted successfully";
  })
  .catch((error) => {
    console.error('Error:', error);
    const del_message = document.getElementById("del_message");
    del_message.innerText = "Error deleting post";
  });
}

// updating the post created
function editPost(id) {
  fetch(`http://localhost:3000/coffee/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const update_container = document.getElementById("update_container");

      update_container.innerHTML = `
        <h5>UPDATE Post</h5>
        <div id="update_message" class="text-success" role="alert">
            <!-- Your message will be displayed here -->
        </div>
        <form id="update_post_form" class="update_post_form">
            <div class="mb-3">
                <input type="text" class="form-control" value="${data.title}" placeholder="Enter Title" id="update_title" required>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" value="${data.imageURL}" placeholder="Image URL" id="update_imageURL" required>
            </div>
            <div class="mb-3">
                <input type="number" class="form-control" value="${data.price}" placeholder="Price" id="update_price" required>
            </div>
            <div class="mb-3">
                <input type="number" class="form-control" value="${data.amount}" placeholder="Amount" id="update_amount" required>
            </div>
            <button type="submit" class="btn btn-primary">UPDATE</button>
        </form>
      `;

      const update_form = document.getElementById("update_post_form");

      update_form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("update_title").value;
        const image = document.getElementById("update_imageURL").value;
        const price = document.getElementById("update_price").value;
        const amount = document.getElementById("update_amount").value;

        console.log(title, image, price,amount);

        
        fetch(`http://localhost:3000/coffee/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title: title,
            imageURL: image,
            price: price,
            amount: amount,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            const update_message = document.getElementById("update_message");
            update_message.innerText = "Post updated successfully";
          })
          .catch((error) => {
            
            const update_message = document.getElementById("update_message");
            update_message.innerText = "Failed to edit post";
            update_message.classList.remove("text-success");
            update_message.classList.add("text-danger");
            console.error("Error editing post:", error);
          });
      });
    });
}